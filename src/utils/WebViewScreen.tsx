import React, {useEffect, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import {Loading} from '../Components/util/Loading';
import {useAuth} from './AuthContext';

import ReloadButton from './RealoadButton';

interface WebViewScreenProps {
  url?: string;
  route?: RouteProp<any, any>;
  navigation?: StackNavigationProp<any, any>;
}
interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  version: string;
}
interface Cookies {
  [key: string]: {
    value: string;
  };
}

const getAuthorizationCookie = async (url: string): Promise<string | null> => {
  try {
    const cookies: Cookies = await CookieManager.get(url);
    if (cookies.X_AMZ_JWT) {
      return cookies.X_AMZ_JWT.value;
    } else {
      console.log('Authorization cookie not found');
      return null;
    }
  } catch (error) {
    console.log('Error getting cookies:', error);
    return null;
  }
};
const extractHostname = (url: string) => {
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  return matches && matches[1];
};

// const calculateExpiryDate = (date: string) => {
//   const dateObject = new Date(date);
//   dateObject.setFullYear(dateObject.getFullYear() + 1);
//   console.log('expiredate:', dateObject.toISOString());
//   return dateObject.toISOString();
// };
const WebViewScreen: React.FC<WebViewScreenProps> = ({
  route,
  url,
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const {authData} = useAuth();
  const webViewRef = useRef<WebView>(null);
  const Url = url || route?.params?.url;
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerRight: () => <ReloadButton onPress={reloadWebView} />,
      });
    }
    const effectiveurl = extractHostname(Url);
    const setMultipleCookies = async () => {
      if (authData && effectiveurl) {
        // const expiryDate = calculateExpiryDate(loggedInDate);
        const cookies: Cookie[] = [
          {
            name: 'X_AMZ_JWT',
            value: authData?.session?.token,
            domain: effectiveurl,
            path: '/',
            version: '1',
          },
          {
            name: 'REQUEST_ORIGIN',
            value: 'QUICKVERSE',
            domain: effectiveurl,
            path: '/',
            version: '1',
          },
        ];
        const existingCookies: Cookies = await CookieManager.get(
          'https://' + effectiveurl,
        );

        for (const cookie of cookies) {
          const existingCookieValue = existingCookies[cookie.name]?.value;

          if (existingCookieValue !== cookie.value) {
            await CookieManager.set('https://' + effectiveurl, {
              name: cookie.name,
              value: cookie.value,
              domain: cookie.domain,
              path: cookie.path,
              version: cookie.version,
            })
              .then(done => {
                console.log('CookieManager.set =>', done);
              })
              .catch(error => {
                console.log('error setting up thje cookie', error);
              });
          } else {
            console.log(
              `Cookie ${cookie.name} is already set with the same value`,
            );
          }
        }
        setLoading(false);
      } else {
        console.log('authData is null');
        setLoading(false);
      }
    };
    setMultipleCookies();
  }, [authData, Url, navigation]);

  if (loading) {
    return <Loading />;
  }

  if (!Url) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: No URL provided.</Text>
      </View>
    );
  }
  retrieveAuthorizationCookie(Url);

  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };
  return (
    <WebView ref={webViewRef} source={{uri: Url}} style={styles.webview} />
  );
};
const retrieveAuthorizationCookie = async (
  effectiveUrl: string,
): Promise<void> => {
  await getAuthorizationCookie(effectiveUrl);
};
const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
