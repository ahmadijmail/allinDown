// import { StatusBar } from "expo-status-bar";
// import Icon from "react-native-vector-icons/FontAwesome";
// import axios from "axios";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import axios from "axios";

import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

import {
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  Clipboard,
} from "react-native";
// import RNFS from 'react-native-fs';

import { useState } from "react";
export default function App() {
  const [oname, setName] = useState("");
  const [longurl, seturl] = useState("");

  const downlaoder = async () => {
    const text = await Clipboard.getString();
    let urlkey = text.split("/");
    let key = urlkey[3];

    await axios
      .get(
        "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",

        {
          params: {
            id: key,
          },
          headers: {
            "X-RapidAPI-Key":
              "433ce78428msh6f9c42b80105a0cp12ce43jsn2d192ab2b9e3",
            "X-RapidAPI-Host":
              "ytstream-download-youtube-videos.p.rapidapi.com",
          },
        }
      )
      .then((res) => {
        setName(res.data.formats[0].url);
        //  console.log(res.data.formats[0].url);
        downloadFile(res.data.formats[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function downloadFile(url) {
    console.log(url);
    // Downloading the file
    let fileLocation = FileSystem.documentDirectory + "test.mp4";

    FileSystem.downloadAsync(url, fileLocation)
      .then(({ url }) => {
        // Saving the file in a folder name `MyImages`
        const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log("hiii");
        if (status === "granted") {
          const asset = MediaLibrary.createAssetAsync(url);
          MediaLibrary.createAlbumAsync("MyImages", asset, false);
        }
        MediaLibrary.saveToLibraryAsync(fileLocation);
        alert("downloaded done");
        // Sharing the downloded file
        //Sharing.shareAsync(fileLocation);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // const downlaoder = async () => {
  //   // const options = {
  //   //   method: 'GET',
  //   //   url: 'https://aiov-download-youtube-videos.p.rapidapi.com/GetVideomlDetails',
  //   //   params: {URL: 'https://fb.watch/g2dj86EPLL/'},
  //   //   headers: {
  //   //     'X-RapidAPI-Key': '433ce78428msh6f9c42b80105a0cp12ce43jsn2d192ab2b9e3',
  //   //     'X-RapidAPI-Host': 'aiov-download-youtube-videos.p.rapidapi.com'
  //   //   }
  //   // };

  //   // axios.get(options).then(function (response) {
  //   //   console.log(response.data);
  //   // }).catch(function (error) {
  //   //   console.error(error);
  //   // });

  //   await axios
  //     .get(
  //       "https://aiov-download-youtube-videos.p.rapidapi.com/GetVideomlDetails",

  //       {
  //         params: {
  //           URL: "https://fb.watch/g2dj86EPLL/",
  //         },
  //         headers: {
  //           "X-RapidAPI-Key":
  //             "433ce78428msh6f9c42b80105a0cp12ce43jsn2d192ab2b9e3",
  //           "X-RapidAPI-Host": "aiov-download-youtube-videos.p.rapidapi.com",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       createTwoButtonAlert(res.config.adapter.data)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <ScrollView style={{height:"100%", backgroundColor:'black'}} >
      <View style={styles.container} >
        <Text style={styles.head}>Downlaod Anything!</Text>
        <Pressable style={styles.button} onPress={() => downlaoder()}>
          <Text style={styles.text}>Download</Text>
        </Pressable>
        {/* <Text style={styles.footer}>2022@ Ahmad Ijmail</Text> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
     alignItems: "center",
    width: "100%",
  },

  text: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignItems: "center",
  },

  footer: {
   // marginTop: "45%",
    alignItems: "center",

  //  color: "white",
  },
  button: {
    marginTop: "60%",
    marginBottom: "40%",
    alignItems: "center",
    width: "60%",
    height: "12%",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    // justifyContent: "space-around",
  },

  button2: {
    bottom: "15%",
    alignItems: "center",
    width: "50%",
    height: "10%",
    justifyContent: "center",
    borderRadius: 8,
    // backgroundColor: "white",
    // justifyContent: "space-around",
  },

  head: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignItems: "center",

    top: 100,
  },
});
