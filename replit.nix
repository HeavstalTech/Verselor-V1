{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.ffmpeg
    pkgs.imagemagick
    pkgs.libwebp
    pkgs.git
  ];
}
