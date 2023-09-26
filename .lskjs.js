module.exports = process.env.NODE_ENV === 'isuvorov' ? {
  pathexec: {
    paths: [
      // `/opt/homebrew/lib/node_modules/lsk/node_modules/@lskjs/cli-scripts`,
      `${process.env.HOME}/projects/lskjs/libs-cli/cli-scripts`
    ],
  },
  cwd: __dirname,
} : {
  cwd: __dirname,
};
