// app/(tabs)/watch/[id].tsx
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { placeholder_image } from "@/constants/booking.data";
import Colors from "@/constants/Colors";
import { IMAGE_BASE } from "@/services/apiClient";
import { Movie } from "@/services/movie";
import { getMovieDetails } from "@/services/movies";
import styles from "@/styles/movie.styles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ YOUR PROVIDED TYPESCRIPT ARCHITECTURE
export interface MovieDetails extends Movie {
  runtime: number | null;
  tagline: string;
  genres: { id: number; name: string }[];
}

const genreColors = ["#15D2BC", "#FF6B6B", "#564CA3", "#CD9D0F"];
export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  // ✅ STRIKTLY TYPED STATE LAYER
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isLandscape = width > height;

  useEffect(() => {
    setLoading(true);
    getMovieDetails(Number(id))
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const imageUri = movie?.backdrop_path
    ? { uri: `${IMAGE_BASE}${movie.backdrop_path}` }
    : placeholder_image;

  const renderHeroOverlay = () => (
    <View style={styles.heroTextOverlayContainer}>
      <Text style={styles.metaDateText}>In Theaters {movie?.release_date}</Text>
      <Button
        btntitle="Get Tickets"
        bgc={Colors.btnbg}
        onPress={() => router.push("/watch/booking")}
      />
      <Button btntitle="Watch Trailer" />
    </View>
  );

  const renderMainInfoContent = () => (
    <>
      <Text
        style={[styles.sectionHeadingTitle, { marginTop: 0, fontSize: 22 }]}
      >
        {movie?.title} {movie?.runtime ? `(${movie.runtime} mins)` : ""}
      </Text>
      <Text style={styles.sectionHeadingTitle}>Genres</Text>
      <View style={styles.tagsContainerRow}>
        {movie?.genres?.map((genre, idx) => (
          <View
            key={idx}
            style={[
              styles.tagBadgeNode,
              { backgroundColor: genreColors[idx % genreColors.length] },
            ]}
          >
            <Text style={styles.tagBadgeText}>{genre.name}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeadingTitle}>Overview</Text>
      <Text style={styles.bodyOverviewParagraphText}>{movie?.overview}</Text>
    </>
  );
  if (loading) {
    return <Loader />;
  }
  if (isLandscape) {
    return (
      <View
        style={[
          styles.detailsRoot,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.landscapeSplitWrapper}>
          <ImageBackground
            source={imageUri}
            style={styles.heroPosterLandscape}
            imageStyle={styles.imageScaling}
            resizeMode="cover"
          >
            <TouchableOpacity
              style={styles.backActionButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {renderHeroOverlay()}
          </ImageBackground>

          <ScrollView
            style={styles.contentBodyWrapperLandscape}
            showsVerticalScrollIndicator={false}
          >
            {renderMainInfoContent()}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.detailsRoot}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={imageUri}
        style={styles.heroPosterPortrait}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.backActionButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        {renderHeroOverlay()}
      </ImageBackground>

      <View style={styles.contentBodyWrapperPortrait}>
        {renderMainInfoContent()}
      </View>
    </ScrollView>
  );
}
