import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const signIn = async () => {
  try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();
      console.log('Sign-in exitoso:', signInResult);
      return signInResult;
  } catch (error: any) {
      if (isErrorWithCode(error)) {
          switch (error.code) {
              case statusCodes.SIGN_IN_CANCELLED:
                  console.log("El usuario canceló el inicio de sesión");
                  break;
              case statusCodes.IN_PROGRESS:
                  console.log("Operación en progreso");
                  break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                  console.log("Play Services no está disponible");
                  break;
              default:
                  // Manejar DEVELOPER_ERROR específicamente verificando el mensaje de error
                  if (error.message?.includes('DEVELOPER_ERROR')) {
                      console.error("Error de configuración. Verifica:", {
                          message: "1. El webClientId es correcto",
                          error: error.message,
                          code: error.code
                      });
                  } else {
                      console.error("Error desconocido", error);
                  }
          }
      } else {
          console.error("Error no relacionado con Google Sign In", error);
      }
      
      // Log completo del error para debugging
      console.log('Error detallado:', {
          code: error.code,
          message: error.message,
          fullError: error
      });
      
      throw error;
  }
};