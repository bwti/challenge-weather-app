import styled from 'styled-components/native';
import { Icons } from '@assets/icons';

export const IconSync = styled.Image.attrs({ source: Icons.Sync })({
  height: 100,
  width: 100,
});

export const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});
export const Button = styled.TouchableOpacity({
  alignItems: 'center',
});

export const Text = styled.Text({
  marginHorizontal: 10,
  fontSize: 20,
  marginBottom: 5,
  fontWeight: 'bold',
  color: '#fff',
});
