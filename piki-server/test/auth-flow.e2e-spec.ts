import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginDto } from "src/auth/dto/login.dto";
import * as request from "supertest";
import { getConnection } from "typeorm";

import { Address } from "../src/addresses/entities/address.entity";
import { AuthModule } from "../src/auth/auth.module";
import { RegisterDto } from "../src/auth/dto/register.dto";
import { File } from "../src/files/entities/file.entity";
import { OrderSku } from "../src/order-skus/entities/order-sku.entity";
import { Sku } from "../src/skus/entities/sku.entity";
import { User } from "../src/users/entities/user.entity";

describe("[Feature] Authentication", () => {
  const registerDto: RegisterDto = {
    password: "mypassword",
    user: {
      username: "test_user_1",
      first_name: "my_first_name",
      last_name: "my_last_name",
      seller: true,
      email: "myemail@mydomain.com",
      phone: "1234567890"
    }
  };

  const registerDtoDuplicateUsername: RegisterDto = {
    password: "mypassword",
    user: {
      username: "test_user_1",
      first_name: "my_first_name",
      last_name: "my_last_name",
      seller: true,
      email: "myemail2@mydomain.com",
      phone: "0123456789"
    }
  };

  const registerDtoDuplicateEmail: RegisterDto = {
    password: "mypassword",
    user: {
      username: "test_user_2",
      first_name: "my_first_name",
      last_name: "my_last_name",
      seller: true,
      email: "myemail@mydomain.com",
      phone: "0123456789"
    }
  };

  const registerDtoDuplicatePhone: RegisterDto = {
    password: "mypassword",
    user: {
      username: "test_user_2",
      first_name: "my_first_name",
      last_name: "my_last_name",
      seller: true,
      email: "myemail2@mydomain.com",
      phone: "1234567890"
    }
  };

  const auth: LoginDto = {
    email: "myemail@mydomain.com",
    password: "mypassword"
  };

  const invalidAuth: LoginDto = {
    email: "myemail@mydomain.com",
    password: "invalidassword"
  };

  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: "postgres",
          // note this still isn't using docker!
          // it's using localhost DB,
          // see note in docker-compose about deciding what to do
          host: process.env.POSTGRES_LOCAL_HOST,
          port: +process.env.TEST_POSTGRES_PORT,
          username: process.env.TEST_POSTGRES_USER,
          password: process.env.TEST_POSTGRES_PASSWORD,
          database: process.env.TEST_POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true
        }),
        TypeOrmModule.forFeature([User, Sku, File, OrderSku, Address])
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    );

    await getConnection().synchronize(true);
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  // TODO learn how to run DB query in tests
  // and check that user record and auth record are created
  // or do in unit tests is better
  it("Create [POST /auth/register] succeeds and returns access token", () => {
    return request(httpServer)
      .post("/auth/register")
      .send(registerDto as RegisterDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toHaveProperty("access_token");
        expect(body["access_token"]).toBeDefined();
      });
  });

  it("Create [POST /auth/register] with duplicate username fails with message", () => {
    return request(httpServer)
      .post("/auth/register")
      .send(registerDtoDuplicateUsername as RegisterDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .then(({ body }) => {
        expect(body["message"]).toContain("username");
        expect(body["message"]).toContain("already exists");
      });
  });

  it("Create [POST /auth/register] with duplicate email fails with message", () => {
    return request(httpServer)
      .post("/auth/register")
      .send(registerDtoDuplicateEmail as RegisterDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .then(({ body }) => {
        expect(body["message"]).toContain("email");
        expect(body["message"]).toContain("already exists");
      });
  });

  it("Create [POST /auth/register] with duplicate phone fails with message", () => {
    return request(httpServer)
      .post("/auth/register")
      .send(registerDtoDuplicatePhone as RegisterDto)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .then(({ body }) => {
        expect(body["message"]).toContain("phone");
        expect(body["message"]).toContain("already exists");
      });
  });

  it("Create [POST /auth/login] returns JWT with valid credentials", () => {
    return request(httpServer)
      .post("/auth/login")
      .send(auth as LoginDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toHaveProperty("access_token");
        expect(body["access_token"]).toBeDefined();
      });
  });

  it("Create [POST /auth/login] fails with invalid credentials", () => {
    return request(httpServer)
      .post("/auth/login")
      .send(invalidAuth as LoginDto)
      .expect(HttpStatus.UNAUTHORIZED)
      .then(({ body }) => {
        expect(body["message"]).toContain("Unauthorized");
      });
  });

  it("Shows [Get /] fails with invalid auth token", done => {
    return request(httpServer)
      .get("/shows")
      .set("Authorization", `Bearer invalid-token`)
      .expect(HttpStatus.UNAUTHORIZED)
      .end(() => {
        done();
      });
  });

  it("Shows [Get /] fails without auth token", done => {
    return request(httpServer)
      .get("/shows")
      .expect(HttpStatus.UNAUTHORIZED)
      .end(() => {
        done();
      });
  });

  it("Shows [Get /] succeeds with auth token", done => {
    return request(httpServer)
      .post("/auth/login")
      .send(auth as LoginDto)
      .end((err, response) => {
        request(httpServer)
          .get("/shows")
          .set(
            "Authorization",
            `Bearer ${JSON.parse(response.text)["access_token"]}`
          )
          .expect(HttpStatus.OK);
        done();
      });
  });

  // call shows.get
  // authorization TODO (once this guard is added)
  //   example of this in https://www.youtube.com/playlist?list=PLBeQxJQNprbiykCyVNcSExTgytMMjSjnQ
  //      seller protected route without seller flag cannot access
  //      seller protected route with seller flag can access
});
