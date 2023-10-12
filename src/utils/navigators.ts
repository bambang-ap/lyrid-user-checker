import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackList, RootStackParamList} from '@appTypes/navigators.type';

export function useStackNavigation<K extends RootStackList>() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  type RouteProps = RouteProp<RootStackParamList, K>;

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();

  return {navigation, route};
}
