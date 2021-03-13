import { StyleSheet, Text, View } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 10,
  },
  _innerView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding:10,
    paddingTop:40
  },
  _screenHeading: {
    fontSize: 20,
    color: "#525252",
    fontWeight: "bold",
    textAlign: "center",
  },
  _avatarImg: {
    // marginBottom: 20,
    alignSelf: "center",
    height: 125,
    width: 125,
    borderRadius: 65,
    flex:1,
  
  },
  _desc: {
    color: "#525252",
    fontWeight: "300",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 20,
  },

  _confirmBtn: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    marginVertical: 12,
  },
  _confirmBtn_text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    color: "white",
    fontSize: 16,
  },
  _circle: {
    height: 125,
    width: 125,
    borderRadius: 60,
    justifyContent:"center",
    alignItems:"center",
    elevation:5,
    marginTop:40

  },
  _orView: {
    borderBottomWidth: 1,
    paddingHorizontal:20,
    marginBottom:20
  },
  _orCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:-18
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
  _orText:{
    color:"white",
    fontSize:8
  }
});

export default styles;
