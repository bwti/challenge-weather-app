import React from 'react';
import { ActivityIndicator, GestureResponderEvent } from 'react-native';
import * as S from './styles';

interface SyncButtonProps {
  loading?: boolean | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const SyncButton = (props: SyncButtonProps) => {
  return (
    <S.Button onPress={props.onPress}>
      {props.loading ? (
        <S.Row>
          <ActivityIndicator size="large" color="#fff" />
          <S.Text>Syncing...</S.Text>
        </S.Row>
      ) : (
        <S.IconSync />
      )}
    </S.Button>
  );
};
