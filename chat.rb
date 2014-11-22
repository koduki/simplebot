def chat (text)
  msg = if text == 'hello'
    "こんにちは"
  end
  puts msg
end

def parse text
  require 'open-uri'
  require 'uri'
  require 'json'

  api_url = "127.0.0.1:9000"
  url = "http://#{api_url}/?text=#{URI.escape(text)}"

  JSON.load open(url).read
end

def pairs tokens
  xs = []
  tokens.each_cons(3) {|a, b, c| xs << [a, [b, c]] }
  xs
end
