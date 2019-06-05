# config valid only for current version of Capistrano
lock "~> 3.11.0"

set :application, 'chat-space'
set :repo_url,  'git@github.com:XIAO100he/chat-space.git'

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.5.1' 

set :ssh_options, auth_methods: ['publickey'],
                  keys:  ['~/.ssh/xiao_2142.pem']

set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

# secrets.yml用のシンボリックリンクを追加
#set :linked_filesで指定されたファイルは、元々のディレクトリを参照する代わりに、shared/元々のディレクトリ構成を参照するようになります。今回の例で言うと、config/secrets.ymlを参照する代わりに、shared/config/secrets.ymlを参照するようになります。
set :linked_files, %w{ config/secrets.yml }

# 元々記述されていた after 「'deploy:publishing', 'deploy:restart'」以下を削除して、次のように書き換え

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
  
#desc upload secrets.yml以下の記述は、ローカル環境にあるconfig/secrets.ymlを本番環境のshared/config/secrets.ymlに反映するための設定を行なっています。これで、.gitignoreに記載されているsecrets.ymlを、Githubを経由せずにデプロイすることができます。
  desc 'upload secrets.yml'
  task :upload do
    on roles(:app) do |host|
      if test "[ ! -d #{shared_path}/config ]"
        execute "mkdir -p #{shared_path}/config"
      end
      upload!('config/secrets.yml', "#{shared_path}/config/secrets.yml")
    end
  end
  before :starting, 'deploy:upload'
  after :finishing, 'deploy:cleanup'
end