enum PostgresErrorCode {
  unique_violation = '23505',
  not_null_violation = '23502',
  check_violation = '23514',
}

export default PostgresErrorCode;
