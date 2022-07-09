import styled from 'styled-components/native';

export const Background = styled.ImageBackground({
  width: '100%',
  height: '100%',
});

export const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: 40,
});

export const Header = styled.View({
  alignItems: 'center',
});

export const HeaderRow = styled.View({
  flexDirection: 'row',
});

export const IconWeather = styled.Image({
  alignSelf: 'center',
  height: 100,
  width: 100,
});

export const Text = styled.Text({
  marginHorizontal: 5,
  fontSize: 15,
  fontWeight: 500,
  textAlign: 'center',
  color: '#fff',
});

export const TextGroup = styled.View({
  marginVertical: 10,
  alignItems: 'center',
});

export const TextSubtitle = styled.Text({
  fontSize: 20,
  marginBottom: 5,
  fontWeight: 'bold',
  textTransform: 'capitalize',
  color: '#fff',
});

export const TextTitle = styled.Text({
  marginLeft: 20,
  alignSelf: 'center',
  fontSize: 50,
  fontWeight: 'bold',
  color: '#fff',
});
