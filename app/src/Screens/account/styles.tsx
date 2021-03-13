import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:"white"
  },
  _circle: {
    height: 125,
    width: 125,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    alignSelf: "center",
    marginVertical: 50,
  },
  _avatarImg: {
    alignSelf: "center",
    height: 125,
    width: 125,
    borderRadius: 65,
    flex: 1,
  },
  _editView: {
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  _list_icon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  _pages: {
    fontSize: 20,
    color: "#525252",
    fontWeight: "bold",
  },
  _list: {
    // elevation:1,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 50,
    marginVertical: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  _userAvatar: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  _profilePic: {
    height: 35,
    width: 25,
    borderRadius: 5,
  },
});

export default styles;
