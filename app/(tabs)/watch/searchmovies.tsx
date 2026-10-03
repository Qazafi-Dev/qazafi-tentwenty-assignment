import Header from "@/components/Header";
import { getSearchMovies } from "@/services/movies";
import styles from "@/styles/movies.styles";
import { useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const searchmovies = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  const cardWidth = isLandscape ? (width - 48) / 2 : width - 32;
  const [searchValue, setSearchValue] = useState<string>("");

  function handleSearchChange(text: string) {
    getSearchMovies(text)
      .then((data) => {
        // Handle the search results here
        console.log("Search results:", data);
      })
      .catch((error) => {
        console.error("Error searching movies:", error);
      })
      .finally(() => {
        // Any cleanup or final actions after the search
      });
  }
  const onChangeHandler = (value: string): void => {
    setSearchValue(value);

    // 1. Clear any active pending timers instantly as the user continues typing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2. Queue a fresh network execution payload after exactly 1 second (1000ms) of inactivity
    timeoutRef.current = setTimeout(() => {
      handleSearchChange(value);
    }, 1000);
  };
  return (
    <View style={styles.screenCanvas}>
      <View style={[styles.head, { paddingTop: insets.top, paddingBottom: 8 }]}>
        <Header
          searchValue={searchValue}
          onSearchChange={onChangeHandler}
          setSearchValue={setSearchValue}
        />
      </View>
    </View>
  );
};

export default searchmovies;
