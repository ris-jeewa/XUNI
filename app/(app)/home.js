import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import useMovieStore from "../../components/MovieStore";
import { useAuth } from "../../context/authContext";
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../../api/moviedb";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Home() {
  const { logout, user } = useAuth();
  const [movies, setMovies] = useState([]);
  const { clickCount, incrementClick } = useMovieStore();
  const [selectedCategory, setSelectedCategory] = useState("Popular");

  useEffect(() => {
    fetchMoviesByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchMoviesByCategory = async (category) => {
    let data;
    if (category === "Trending") {
      data = await fetchTrendingMovies();

    } else if (category === "Popular") {
        data = await fetchPopularMovies();

    } else if (category === "Upcoming") {
      data = await fetchUpcomingMovies();

    } else if (category === "Top Rated") {
        data = await fetchUpcomingMovies();
      }

    setMovies(data.results);
  };

  const handleLogout = async () => {
    await logout();
  };

  const categories = ["Trending", "Popular", "Upcoming","Top Rated"];

  const MovieCard = ({ movie }) => (
    <TouchableOpacity
      className="bg-white rounded-xl mb-8 overflow-hidden shadow-sm"
      onPress={() => {
        incrementClick();
      }}
    >
      <View className="h-80 relative">
        {/* Background image with shading */}
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{ flex: 1, justifyContent: "center" }}
          blurRadius={10}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
        </ImageBackground>

        {/* Foreground image */}
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{
            height: "85%",
            width: "100%",
            resizeMode: "contain",
            position: "absolute",
            top: "8%",
          }}
        />
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold flex-1 mr-2" numberOfLines={1}>
            {movie.title}
          </Text>
          <View className="bg-lime-500 px-5 py-1 rounded-full">
            <Text className="text-white text-sm">
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
        <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
          {movie.overview}
        </Text>
        <View className="flex-row">
          <Text className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            {new Date(movie.release_date).getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-800 pt-12">
      <View className="flex flex-row justify-between items-center px-2">
        <View className="flex flex-row p-4 gap-10 items-center">
          <Image
            source={{ uri: user?.profileUrl }}
            className="rounded-full"
            style={{ width: 40, height: 40, borderRadius: 30 }}
          />
          <Text className="text-white text-lg font-bold">
            Welcome, {user?.username || 'Guest'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogout} // Trigger logout function
          className="bg-slate-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white text-sm font-bold">Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 40 }}
        showsVerticalScrollIndicator={false} 
      />

      <View>
        <TouchableOpacity className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-lime-500 justify-center items-center shadow-lg">
          <Text className="text-white text-xl font-bold">{clickCount}</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      <View className=" bg-gray-900 p-4" style={{ height: hp(20) }}>
        <Text className="text-white text-lg font-bold mb-4">Categories</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`py-2 px-4 mb-2 rounded-lg ${
                selectedCategory === category ? "bg-lime-500" : "bg-gray-700"
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text className="text-white text-center">{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
