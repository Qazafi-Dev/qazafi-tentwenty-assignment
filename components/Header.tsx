import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface CustomHeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

const Header: React.FC<CustomHeaderProps> = ({
  searchValue,
  setSearchValue,
  onSearchChange,
  placeholder = "TV Shows, movies and more",
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchBarWrapper}>
        {/* Leading Search Icon */}
        <Ionicons
          name="search"
          size={20}
          color="#828282"
          style={styles.searchIcon}
        />

        {/* Input Field */}
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder={placeholder}
          placeholderTextColor="#828282"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable onPress={() => setSearchValue("")} style={styles.iconButton}>
          <Ionicons
            name="search"
            size={20}
            color="#828282"
            style={styles.searchIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingVertical: 12,
    backgroundColor: "#FAFAFA", // Matches your screen background
    alignSelf: "center",
    // Adds a subtle shadow for depth
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F6", // Light gray background for the search bar
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333333",
    height: "100%",
    fontFamily: "Poppins-Light",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
