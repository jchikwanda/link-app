import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

export default function App() {

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = Dimensions.get('window').width;
  const links = [
    "https://www.amazon.com/-/de/dp/B07N3RFXRL/ref=pd_ci_mcx_mh_ci_mcx_mr_mp_m_0?pd_rd_w=C8JmI&content-id=amzn1.sym.07889413-fea5-4a13-b06c-d39edf4aa03e&pf_rd_p=07889413-fea5-4a13-b06c-d39edf4aa03e&pf_rd_r=49PVZJ7PQETKW6WJ8R3N&pd_rd_wg=I909t&pd_rd_r=74e6ce3d-f18f-4e84-b9a5-b9073478d5e0&pd_rd_i=B07N3RFXRL&th=1",
    "https://www.youtube.com/watch?v=LbWjVNjlpjA",
    "https://www.spiegel.de/"
  ]
  const itemCount = links.length;

  const goToNext = () => {
    if (currentIndex < itemCount - 1) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current.scrollTo({ x: itemWidth * (currentIndex + 1), animated: true });
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current.scrollTo({ x: itemWidth * (currentIndex - 1), animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Link-App</Text>
      </View>

      {/* Main */}
      <ScrollView 
        style={styles.main}
        ref={carouselRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.floor(contentOffset / itemWidth));
        }}
      >
        {
          links.map((link, index) => {
            return (
              <WebView
                key={`${index}+${link}`}
                style={styles.carouselItem}
                source={{ uri: link }}
                onLoadStart={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  this.isLoading = nativeEvent.loading;
                }}
              />
            )
          })
        }
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerInnerContainer}>
          <TouchableOpacity onPress={goToPrev}>
            <Ionicons name="caret-back-circle-outline" style={styles.buttonIcons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNext}>
            <Ionicons name="caret-forward-circle-outline" style={styles.buttonIcons} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  header: {
    position: 'absolute',
    top: 0,
    height: 60,
    backgroundColor: '#000000',
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#FFF"
  },
  main: {
    paddingVertical: 12,
    marginBottom: 60,
    marginTop: 60,
  },
  buttonIcons: {
    fontSize: 32,
    color: '#fff'
  },
  carouselItem: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  footer: {
    position: 'absolute',
    height: 60,
    backgroundColor: '#000',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerInnerContainer: {
    flexDirection: 'row',
    columnGap: 20
  }
});
