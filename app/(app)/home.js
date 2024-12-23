import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import useMovieStore from "../../components/MovieStore";
import { useAuth } from "../../context/authContext";
import { apiKey } from "../../constants/index";
import { fetchTrendingMovies } from "../../api/moviedb";
export default function Home() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const { clickCount, incrementClick } = useMovieStore();

  useEffect(() => {
    getTRendingMovies();
  }, []);

  const getTRendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log(data);

    setMovies(data.results);
  };

  const MovieCard = ({ movie }) => (
    <TouchableOpacity
      className="bg-white rounded-xl mb-8 overflow-hidden shadow-sm"
      onPress={() => {
        incrementClick();
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        className="h-80"
      />
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
      <View className="flex flex-row p-4 gap-10 items-center">
        <Image
          source={{ uri: user?.profileUrl }}
          className="rounded-full"
          style={{ width: 40, height: 40, borderRadius: 30 }}
        />
        <Text className="text-white text-lg font-bold">
          Welcome, {user.username}
        </Text>
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 40 }}
      />
      <TouchableOpacity className="absolute bottom-5 right-5 w-16 h-16 rounded-full bg-lime-500 justify-center items-center shadow-lg">
        <Text className="text-white text-xl font-bold">{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}
