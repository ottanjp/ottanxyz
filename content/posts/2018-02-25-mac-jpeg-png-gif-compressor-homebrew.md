---
author: ottan
date: 2018-02-25 13:08:48+00:00
draft: false
title: MacでJPEG、PNG、GIFを高速に圧縮できるHomebrewからインストール可能なCUIユーティリティ
type: post
url: /mac-jpeg-png-gif-compressor-homebrew-6652/
categories:
  - Mac
tags:
  - Homebrew
---

![](/images/2018/02/180225-5a92680f2a1cd.jpg)

画像ファイルを SNS でシェアする場合、WordPress などのブログで画像ファイルを使用する場合、なるべくファイルサイズを小さくしたいことがあります。今回は、Mac のパッケージマネージャーである Homebrew から簡単にインストール可能な、画像圧縮ユーティリティをご紹介します。なお、Homebrew については[macOS のパッケージ管理には Homebrew を使おう！Homebrew を使用する理由や便利な使い方までご紹介](/macos-package-manager-homebrew-6216/)でご紹介していますので、こちらの記事もご参照ください。

## Mac で画像ファイルを圧縮するユーティリティ 3 選

今回ご紹介するユーティリティは、Homebrew からインストール可能な、CUI ユーティリティです。[Finder の右クリックメニュー、キーボードショートカットから PNG ファイルを一括して圧縮する](/automator-finder-png-compress-4570/)でご紹介している Automator を併用することで、ターミナルからファイルを選択して圧縮することもできるので非常に便利です。

### JPEG ファイルを圧縮する jpegoptim

`jpegoptim`は、JPEG ファイルを圧縮する CUI ユーティリティです。

    brew install jpegoptim

`jpegoptim`のヘルプを参照すると、さまざまなオプションが用意されていることがわかります。

    Usage: jpegoptim [options] <filenames>

      -d<path>, --dest=<path>
                        specify alternative destination directory for
                        optimized files (default is to overwrite originals)
      -f, --force       force optimization
      -h, --help        display this help and exit
      -m<quality>, --max=<quality>
                        set maximum image quality factor (disables lossless
                        optimization mode, which is by default on)
                        Valid quality values: 0 - 100
      -n, --noaction    don't really optimize files, just print results
      -S<size>, --size=<size>
                        Try to optimize file to given size (disables lossless
                        optimization mode). Target size is specified either in
                        kilo bytes (1 - n) or as percentage (1% - 99%)
      -T<threshold>, --threshold=<threshold>
                        keep old file if the gain is below a threshold (%)
      -b, --csv         print progress info in CSV format
      -o, --overwrite   overwrite target file even if it exists (meaningful
                        only when used with -d, --dest option)
      -p, --preserve    preserve file timestamps
      -P, --preserve-perms
                        preserve original file permissions by overwriting it
      -q, --quiet       quiet mode
      -t, --totals      print totals after processing all files
      -v, --verbose     enable verbose mode (positively chatty)
      -V, --version     print program version

      -s, --strip-all   strip all markers from output file
      --strip-none      do not strip any markers
      --strip-com       strip Comment markers from output file
      --strip-exif      strip Exif markers from output file
      --strip-iptc      strip IPTC/Photoshop (APP13) markers from output file
      --strip-icc       strip ICC profile markers from output file
      --strip-xmp       strip XMP markers markers from output file

      --all-normal      force all output files to be non-progressive
      --all-progressive force all output files to be progressive
      --stdout          send output to standard output (instead of a file)
      --stdin           read input from standard input (instead of a file)

多数のオプションがあり、使用方法に戸惑いますが、よく使用するオプションは以下の通りです。

| オプション | 説明                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| -o         | 出力先に同一ファイルが存在する場合に強制的に上書きします                                                             |
| -d         | デフォルトでは元のファイルを上書きしますが、特定のディレクトリやパスに出力したい場合には、このオプショんを使用します |
| -m         | 圧縮後の JPEG ファイルの品質を 0〜100%で指定します。                                                                 |
| -s         | 画像ファイルの EXIF 情報などのメタデータをすべて削除します                                                           |

ターミナルでの使用例は以下の通りです。

    jpegoptim -o -d <Directory path> -m90 -s *.jpg

### PNG ファイルを圧縮する pngquant

`pngquant`は、PNG ファイルを圧縮する CUI ユーティリティです。

    brew install pngquant

`pngquant`のオプションは以下の通りです。

    usage:  pngquant [options] [ncolors] -- pngfile [pngfile ...]
            pngquant [options] [ncolors] - >stdout <stdin

    options:
      --force           overwrite existing output files (synonym: -f)
      --skip-if-larger  only save converted files if they're smaller than original
      --output file     destination file path to use instead of --ext (synonym: -o)
      --ext new.png     set custom suffix/extension for output filenames
      --quality min-max don't save below min, use fewer colors below max (0-100)
      --speed N         speed/quality trade-off. 1=slow, 3=default, 11=fast & rough
      --nofs            disable Floyd-Steinberg dithering
      --posterize N     output lower-precision color (e.g. for ARGB4444 output)
      --strip           remove optional metadata (default on Mac)
      --verbose         print status messages (synonym: -v)

こちらも多数のオプションがあり、使用方法に戸惑いますが、よく使用するオプションは以下の通りです。

| オプション | 説明                                                                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -f         | 出力先に同一ファイルが存在する場合に強制的に上書きします                                                                                               |
| --ext      | `pngquant`で圧縮したファイルは、「\*-fs8.png」という名称になりますが、「.png」を指定することで、元のファイルを上書きします。`-f`オプションと併用します |

ターミナルでの使用例は以下の通りです。

    pngquant -f --ext .png *.png

### GIF ファイルを圧縮する gifsicle

`gifsicle`は、GIF ファイルを圧縮する CUI ユーティリティです。

    brew install gifsicle

`gifsicle`のオプションは以下の通りです。

    Usage: gifsicle [OPTION | FILE | FRAME]...

    Mode options: at most one, before any filenames.
      -m, --merge                   Merge mode: combine inputs, write stdout.
      -b, --batch                   Batch mode: modify inputs, write back to
                                    same filenames.
      -e, --explode                 Explode mode: write N files for each input,
                                    one per frame, to 'input.frame-number'.
      -E, --explode-by-name         Explode mode, but write 'input.name'.

    General options: Also --no-OPTION for info and verbose.
      -I, --info                    Print info about input GIFs. Two -I's means
                                    normal output is not suppressed.
          --color-info, --cinfo     --info plus colormap details.
          --extension-info, --xinfo --info plus extension details.
          --size-info, --sinfo      --info plus compression information.
      -V, --verbose                 Prints progress information.
      -h, --help                    Print this message and exit.
          --version                 Print version number and exit.
      -o, --output FILE             Write output to FILE.
      -w, --no-warnings             Don't report warnings.
          --no-ignore-errors        Quit on very erroneous input GIFs.
          --conserve-memory         Conserve memory at the expense of speed.
          --multifile               Support concatenated GIF files.

    Frame selections:               #num, #num1-num2, #num1-, #name

    Frame change options:
      --delete FRAMES               Delete FRAMES from input.
      --insert-before FRAME GIFS    Insert GIFS before FRAMES in input.
      --append GIFS                 Append GIFS to input.
      --replace FRAMES GIFS         Replace FRAMES with GIFS in input.
      --done                        Done with frame changes.

    Image options: Also --no-OPTION and --same-OPTION.
      -B, --background COL          Make COL the background color.
          --crop X,Y+WxH, --crop X,Y-X2,Y2
                                    Crop the image.
          --crop-transparency       Crop transparent borders off the image.
          --flip-horizontal, --flip-vertical
                                    Flip the image.
      -i, --interlace               Turn on interlacing.
      -S, --logical-screen WxH      Set logical screen to WxH.
      -p, --position X,Y            Set frame position to (X,Y).
          --rotate-90, --rotate-180, --rotate-270, --no-rotate
                                    Rotate the image.
      -t, --transparent COL         Make COL transparent.

    Extension options:
          --app-extension N D       Add an app extension named N with data D.
      -c, --comment TEXT            Add a comment before the next frame.
          --extension N D           Add an extension number N with data D.
      -n, --name TEXT               Set next frame's name.
          --no-comments, --no-names, --no-extensions
                                    Remove comments (names, extensions) from input.
    Animation options: Also --no-OPTION and --same-OPTION.
      -d, --delay TIME              Set frame delay to TIME (in 1/100sec).
      -D, --disposal METHOD         Set frame disposal to METHOD.
      -l, --loopcount[=N]           Set loop extension to N (default forever).
      -O, --optimize[=LEVEL]        Optimize output GIFs.
      -U, --unoptimize              Unoptimize input GIFs.
      -j, --threads[=THREADS]       Use multiple threads to improve speed.

    Whole-GIF options: Also --no-OPTION.
          --careful                 Write larger GIFs that avoid bugs in other
                                    programs.
          --change-color COL1 COL2  Change COL1 to COL2 throughout.
      -k, --colors N                Reduce the number of colors to N.
          --color-method METHOD     Set method for choosing reduced colors.
      -f, --dither                  Dither image after changing colormap.
          --gamma G                 Set gamma for color reduction [2.2].
          --resize WxH              Resize the output GIF to WxH.
          --resize-width W          Resize to width W and proportional height.
          --resize-height H         Resize to height H and proportional width.
          --resize-fit WxH          Resize if necessary to fit within WxH.
          --scale XFACTOR[xYFACTOR] Scale the output GIF by XFACTORxYFACTOR.
          --resize-method METHOD    Set resizing method.
          --resize-colors N         Resize can add new colors up to N.
          --transform-colormap CMD  Transform each output colormap by shell CMD.
          --use-colormap CMAP       Set output GIF's colormap to CMAP, which can
                                    be 'web', 'gray', 'bw', or a GIF file.

こちらも多数のオプションがあり、使用方法に戸惑いますが、よく使用するオプションは以下の通りです。

| オプション | 説明                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------- |
| --optimize | GIF ファイルの最適化レベルを指定します。1〜3 の数値を指定しますが、3 がもっとも最適化が遅い代わりに高圧縮となります。 |
| -o         | 出力先のファイル名を指定します。                                                                                      |

ターミナルでの使用例は以下の通りです。

    gifsicle --optimize=3 -o out.gif in.gif

ブログ等で画像ファイルを使用する場合は、これらのユーティリティを使用して画像ファイルを最適化してからアップロードすると、読み手側の通信量の負担の軽減にも繋がり、読み込み速度も速くなるためぜひ実施しておきましょう！
