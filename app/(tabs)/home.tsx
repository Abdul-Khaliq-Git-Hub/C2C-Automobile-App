import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Search from "../../components/Search";

const Home = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <Search />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
