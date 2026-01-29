{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x
    pkgs.ffmpeg
    pkgs.imagemagick
    pkgs.libwebp
    pkgs.git
    pkgs.pm2
  ];
}
