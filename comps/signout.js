import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Función para cerrar sesión
export const signOut = async (onSignOutComplete) => {
  try {
    await GoogleSignin.signOut();
    console.log('Usuario deslogueado correctamente');
    Alert.alert('Éxito', 'Has cerrado sesión correctamente');
    // Llama al callback después de cerrar sesión exitosamente
    if (onSignOutComplete) {
      onSignOutComplete();
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cerrar la sesión: ' + error.message);
  }
};

// Componente de botón de logout actualizado con callback
export const GoogleSignOutButton = ({ onSignOut }) => {
  const handleSignOut = async () => {
    await signOut(onSignOut);
  };

  return (
    <View style={styles.logoutContainer}>
      <Button
        title="Cerrar sesión de Google"
        onPress={handleSignOut}
        color="#DB4437" // Color rojo de Google
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    marginTop: 20,
    width: '80%',
  },
});