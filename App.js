import * as React from 'react';
const AuthContext = React.createContext();

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createMaterialBottomTabNavigator();


// *******   SCREEN  *********
// ******             ********


function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.container}>
        <Text style={styles.text}>Your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.text}>Your password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Sign in"
            onPress={() => signIn({ username, password })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [state, setState] = React.useState('');
  const [number, setNumber] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.container}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Your password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.text}>Adress</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.text}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <Text style={styles.text}>Your Phone Number</Text>
        <TextInput
          style={styles.input}
          defaultValue={'+'}
          placeholder="Your Phone Number"
          keyboardType="numeric"
          value={number}
          onChangeText={setNumber}
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Sign up"
            onPress={() => signIn({ email, password, address, state, number })}
          />
        </View>
      </View >
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>HOME PAGE</Text>
    </SafeAreaView>
  );
}

function LogoutScreen() {
  const { signOut } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Logout"
            onPress={() => signOut()}
          />
        </View>
      </View >
    </SafeAreaView>
  );
}

// *******   APP  *********
// ******             ********

export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );


  return (
    // <Text>123</Text>
    <NavigationContainer >
      <AuthContext.Provider value={authContext}>
        <Tab.Navigator initialRouteName="Feed">
          {state.userToken == null ? (
            <>
              <Tab.Screen name="Sign In" component={SignInScreen} options={{
                headerTitle: 'Sign In',
                tabBarOptions: {
                  showIcon: false
                },
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511ea6',
                }, headerTitleStyle: {
                  color: 'white',
                },
                tabBarIcon: ({ color, size }) => (

                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),

              }} />
              <Tab.Screen name="Sign Up" component={SignUpScreen} options={{
                headerTitle: 'Sign Up',
                tabBarOptions: {
                  showIcon: false
                },
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511ea6',
                }, headerTitleStyle: {
                  color: 'white',
                },
                tabBarIcon: ({ color, size }) => (

                  <IconOcticons name="person-add" color={color} size={26} />
                ),
              }} />
            </>
          ) : (
            <>
              <Tab.Screen name="Home" component={HomeScreen} options={{
                headerTitle: 'Sign Up',
                tabBarOptions: {
                  showIcon: false
                },
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511ea6',
                }, headerTitleStyle: {
                  color: 'white',
                },
                tabBarIcon: ({ color, size }) => (

                  <EntypoIcon name="home" color={color} size={26} />
                ),
              }} />
              <Tab.Screen name="Logout" component={LogoutScreen} options={{
                headerTitle: 'Sign Up',
                tabBarOptions: {
                  showIcon: false
                },
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#f4511ea6',
                }, headerTitleStyle: {
                  color: 'white',
                },
                tabBarIcon: ({ color, size }) => (

                  <MaterialCommunityIcons name="logout" color={color} size={26} />
                ),
              }} />
            </>
          )}
        </Tab.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    fontSize: 16,
    width: '100%',
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#f4511e',
  },

  button: {
  },

  text: {
    opacity: 0.5,
    alignSelf: 'flex-start',
    marginBottom: '5%',
  },

  buttonContainer: {
    marginTop: '10%',
    width: 120,
    height: 40
  }

});
