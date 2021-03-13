import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  _innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:10
  },
  _deviceImg: {
    height: 250,
    width: 250,
    marginBottom: 20,
  },
  _desc: {
    color: "#525252",
    fontWeight: "300",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 70,
  },
  _codeInput: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 2,
    borderRadius: 5,
    marginBottom:10
  },
  _confirmBtn: {
    width: "94%",
    padding: 8,
    borderRadius: 5,
    marginVertical: 12,
    alignSelf:"center",
    marginTop:110
  },
  _confirmBtn_text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
    color: "white",
    fontSize: 18,
  },
});

export default styles;
