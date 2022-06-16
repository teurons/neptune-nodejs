const DEFAULT_API_BASE = "https://api.teurons.com/neptune";
const EDGE_API_BASE = "https://edge.teurons.com/neptune";

const init = (env, token) => {
  process.env.NEPTUNE_ENV = env;
  process.env.NEPTUNE_TOKEN = token;
};

const fetchEnvironments = () => {};

// $curl = new Curl();
// $curl->setHeader('Accept', 'application/json');
// $curl->setHeader('Authorization', 'Bearer '.config('neptune.token'));
// $curl->get(self::DEFAULT_API_BASE."/environments");

// if ($curl->error) {
//     echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage . "\n";
// } else {
//     echo 'Response:' . "\n";
//     var_dump($curl->response);
// }

const fire = () => {
  console.log(
    "Say something cute",
    process.env.NEPTUNE_ENV,
    process.env.NEPTUNE_TOKEN
  );
};

module.exports = { fire, init, fetchEnvironments };
