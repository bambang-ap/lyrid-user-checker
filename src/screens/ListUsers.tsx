import React, {useEffect} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {AnimatedFAB} from 'react-native-paper';

import AppScreen from '@appComp/AppScreen';
import {RootStackList} from '@appTypes/navigators.type';
import {Icon} from '@components';
import {useListUsers} from '@query';
import {UserCard} from '@screenComp/UserCard';
import {StackAction, useStackNavigation} from '@utils';

export default function ListUsersScreen() {
  const [isExtended, setIsExtended] = React.useState(true);

  const {navigation} = useStackNavigation();
  const {dataList, hasNextPage, fetchNextPage, refetch, isFetchingNextPage} =
    useListUsers();

  function loadMore() {
    if (hasNextPage) fetchNextPage();
  }

  function seeDetails(id: string) {
    navigation.navigate(RootStackList.User, {id});
  }

  function addNewUser() {
    navigation.navigate(RootStackList.User);
  }

  function onScroll({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  }

  function signOut() {
    navigation.dispatch(StackAction('replace', RootStackList.Auth));
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight() {
        return <Icon name="logout" onPress={signOut} />;
      },
    });
  }, []);

  return (
    <AppScreen>
      <FlashList
        onScroll={onScroll}
        data={dataList}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        keyExtractor={item => item?.id}
        estimatedListSize={{height: 80, width: 320}}
        refreshControl={
          <RefreshControl refreshing={isFetchingNextPage} onRefresh={refetch} />
        }
        renderItem={({item}) => (
          <UserCard {...item} onPress={() => seeDetails(item.id)} />
        )}
      />
      <AnimatedFAB
        icon="plus"
        label="Add New User"
        extended={isExtended}
        onPress={addNewUser}
        animateFrom="right"
        tw="absolute bottom-4 right-4"
      />
    </AppScreen>
  );
}
