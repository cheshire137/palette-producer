root_path = File.join(Dir.pwd, 'dist')
use Rack::Static, urls: ['/styles', '/images', '/scripts', '/views',
                         '/bower_components'],
                  root: root_path, index: 'index.html'
run Rack::URLMap.new({'/' => Rack::Directory.new(root_path)})
