import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { signIn } from './comps/signin';
import { GoogleSignOutButton } from './comps/signout';

GoogleSignin.configure({
  webClientId: '173077610258-o8nichqs89b05ol41ahkmlausineba5k.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: '173077610258-5ddd5ch9sherq8ib1nbbufmsnv87aeuc.apps.googleusercontent.com',
});

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Verificar estado de inicio de sesión al cargar
  useEffect(() => {
    const checkSignInStatus = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setIsSignedIn(isSignedIn);
    };
    checkSignInStatus();
  }, []);

  // Modificar la función signIn para actualizar el estado
  const handleSignIn = async () => {
    try {
      await signIn();
      setIsSignedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cierre de sesión
  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <View style={styles.container}>
      {!isSignedIn ? (
        <>
          <Text>Logueate con Google</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignIn}
          />
        </>
      ) : (
        <>
          <Text>Has iniciado sesión correctamente</Text>
          <GoogleSignOutButton onSignOut={handleSignOut} />
        </>
      )}
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