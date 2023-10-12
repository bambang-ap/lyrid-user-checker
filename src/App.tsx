import 'global-methods';

import * as React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper';
import {RecoilRoot} from 'recoil';
import RecoilNexus from 'recoil-nexus';

import {twColor} from '@utils';

import RootStackNavigator from './navigators';

export const queryClient = new QueryClient();

function App() {
  const ref = useNavigationContainerRef();

  const [initialState] = React.useState();

  return (
    <SafeAreaView tw="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor={twColor.white} />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RecoilNexus />
          <PaperProvider>
            <NavigationContainer initialState={initialState} ref={ref}>
              <RootStackNavigator />
            </NavigationContainer>
          </PaperProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
