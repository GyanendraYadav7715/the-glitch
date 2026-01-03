import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/types/types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="flw-item">
      <div className="film-poster">
        <div className="tick ltr">
          {movie.quality && (
            <div className="tick-item tick-quality">{movie.quality}</div>
          )}
          {movie.sub && (
            <div className="tick-item tick-sub">
              <i className="fas fa-closed-captioning mr-1"></i> {movie.sub}
            </div>
          )}
          {movie.dub && (
            <div className="tick-item tick-dub">
              <i className="fas fa-microphone mr-1"></i> {movie.dub}
            </div>
          )}
          {movie.episodes && (
            <div className="tick-item tick-eps">{movie.episodes}</div>
          )}
        </div>
        <Image
          src={movie.poster}
          className="film-poster-img lazyload"
          alt={movie.title}
        />

        <Link
          href={`/watch/${movie.id}`}
          className="film-poster-ahref item-qtip"
          title={movie.title}
        >
          <i className="fas fa-play"></i>
        </Link>
      </div>
      <div className="film-detail">
        <h3 className="film-name">
          <Link
            href={`/watch/${movie.id}`}
            title={movie.title}
            className="dynamic-name"
          >
            {movie.title}
          </Link>
        </h3>
        <div className="fd-infor">
          <span className="fdi-item">{movie.type}</span>
          <span className="dot"></span>
          <span className="fdi-item fdi-duration">{movie.duration}</span>
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

export default MovieCard;
