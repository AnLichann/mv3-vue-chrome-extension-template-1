import json from '@rollup/plugin-json';
import vuePlugin from 'rollup-plugin-vue';
import {
  chromeExtension,
  simpleReloader,
} from 'rollup-plugin-chrome-extension';
import { emptyDir } from 'rollup-plugin-empty-dir';
import typescript from 'rollup-plugin-typescript2'; // '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import alias from 'rollup-plugin-alias';
import _dotenv from 'dotenv/config';
import path from "path";

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: 'chunks/[name]-[hash].js',
  },
  onwarn: (warning, defaultHandler) => {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    defaultHandler(warning)
  },
  // watch: { clearScreen: false }, // for dev debug
  plugins: [
    alias({
      entries: {
        ['@']: path.resolve(__dirname, 'src')
      }
    }),
    // chromeExtension() must be first, in order to properly treat manifest.json as the entry point
    chromeExtension({
      extendManifest: {
        "key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkdqgj81d4fhux\n7qjSv2WnvzVE6LNwjWr6gRBV1vn05rwDVJlRhgtuOiqTaNNMZTqGUEWbteyDGUzf\nPzmH6RL398DdCBvmiKHPimFSORe6n1K/LdfxbThqKfE4HZZOgQ0lf3zzUhllm9in\nBzpW7ynTIF4ZedO6j2vGCyVgM96LUOyI0eVdCF7QhgtG2HN6vcHEgq14tgLUgT7S\nvU8IwebAL9rri9Na+Bu+eytC54PvkVMzdK+LarB+ATIp9Vf/VKOpV1Z3/CZJZD9y\neJ2fkZWGGbAJmmrrRXx52KqXIkNtUA98q6Qf7KQ+TXR83JH/XLjxmOW81+EiuuT7\n/s4Bwy9zAgMBAAECggEAEyniYMIHpLopFvwkvt3fhgLhPaTR1+EaoJLuaNoyaQeD\ny+2NKfMxHMh5UpDp4iJ/hcwPuFuj8gi+LNtMpFoTxEIhvn+l5KByHmFVAsQ1UCEl\nfrJkUbT02GYHvg6wh3hBJGftEtszq2PUBG5yrVOT7457eIN6GOiCWeLNmZ6hpWD6\nMujdnYqfPDCnXccXDs3QMksWjjsEHXjI2eIoXWcB4mHaQ/jD95hg/s7tGYC2AKGs\nkhcMr/olDoNXYt4hN/YUYuGp3gDeezOwY5RfxerDvHL30s7v0bfSG1oq+HOfFn26\n+2o4Rci1ZPzN2/Xpkv5zwThsubazsGpA1Q72k6PulQKBgQDYuom5/uY71TCWH4Ii\nLLKgRxa44AHBv2yauFn8GCnu2Fpa+VLcAZF6LUcAwdEHn7xR991yeNOXu2AHSydT\nC8r8dBKIxw7slIJIsbBDd1MWbpfqDwz4+IEsS44m/pYZVtzRntUnBEuHF1o4SzFb\npxyJa85BP0cR9gK8vhoqtJV+/wKBgQDCQ62ThwYRhcE/54KsoCm0N6rIc9fLQ/MO\nhFIvb80+cS/5VvElEBL0Qz+IkqB3ikHQey4mmCtI8dEgM/QD1412kTRaHT++Sdqn\nHBMDZ/hxzzlapRfXZq93tzUZQZob1iii/ATLc5hKkcx4fk992lYvbtsN0Nb6A2/9\nfT35BFDDjQKBgGgNv1w+ZnmplIcvH4Ka5TQQjXc7jXxhFJqAEiv3ygIze8Yb2E1q\nr1bycBmL9HjtlzPfhkGUgzphKuy1h27WxaFJdTCYKbEqaBbQwOjTXF/zvxoQGdFb\nNmF28QwFxTjrPF+kG4B9DmoQqy9F4q+3XvsXeFJZOB0GeS/3MYb5ZqEvAoGAOpZY\nofaF0QEK0DANC+zdxvlG619shGQAyK8FbkMEnkFam5Mp9OiNHtetMI4wEP1EbhDI\nUWFxJHWxgUnJ3OLESi7uoALUN5pkdCOWZF+V4RUDEiBaOV9BqhQ50l0jkiOba9Qf\nyhAZrNud0/UcGjOf7Hw9WkRSoWIqA0QjTZeMl/0CgYAvB3+5K7rMYpjC96b0/6Ql\nNqBz5RATGYWpCNoIsDsTGzSxw5o3m3+FYP6nXokMoxPXGiTPNQ8+2b6g2mxyBD/m\n4fcm5zxe/kYUrQFXK189k/gUVF7BUZQQIYU1bAXUJ4v6dwOCfAoj4PY9WmCG8Xvo\nZI2GX6LTXQL/1j3gjEewVQ==\n-----END PRIVATE KEY-----",
        "oauth2": {
          "client_id": "370412431305-oc6buot0umdmbdg252j80b7h75jcatsi.apps.googleusercontent.com",
          "scopes": [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
          ]
        },
      }
    }),
    simpleReloader(), // Adds a Chrome extension reloader during watch mode
    vuePlugin({ target: 'browser' }),
    replace({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.VUE_APP_FIREBASE_APIKEY": JSON.stringify("AIzaSyCWCleVy8GHG9QnalUGb50K2b-IKukqgxI"),
      "process.env.VUE_APP_FIREBASE_AUTHDOMAIN": JSON.stringify("ndownloaderex.firebaseapp.com"),
      "process.env.VUE_APP_FIREBASE_PROJECTID": JSON.stringify("ndownloaderex"),
      "process.env.VUE_APP_FIREBASE_STORAGEBUCKET": JSON.stringify("ndownloaderex.appspot.com"),
      "process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID": JSON.stringify("370412431305"),
      "process.env.VUE_APP_FIREBASE_APPID": JSON.stringify("1:370412431305:web:1ac712a6f38183f2f6aa18"),
      "process.env.VUE_APP_MEASUREMENTID": JSON.stringify("G-G1KKNW82QQ"),
      preventAssignment: true
    }),
    typescript(),
    postcss(),
    json(),
    resolve(),
    commonjs(),
    emptyDir(),
  ],
};

