import Apache2 from './apache2';
import Monolog from './monolog';
import MySQL from './mysql';
import Nginx from './nginx';
import PhpFpm from './php-fpm';
import Redis from './redis';

const Parse = {
  apache2: Apache2,
  monolog: Monolog,
  mysql: MySQL,
  nginx: Nginx,
  phpfpm: PhpFpm,
  redis: Redis,
};

export default Parse;
