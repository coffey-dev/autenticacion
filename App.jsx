import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '173077610258-o8nichqs89b05ol41ahkmlausineba5k.apps.googleusercontent.com', 
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true, 
  forceCodeForRefreshToken: false,
  iosClientId: '173077610258-5ddd5ch9sherq8ib1nbbufmsnv87aeuc.apps.googleusercontent.com',
});


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Logueate con google</Text>
      <GoogleSigninButton 
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
