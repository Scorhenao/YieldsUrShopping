interface IDarkModeTheme {
  colors: {
    background: string;
    button: string;
    text: string;
    hover: string;
    border: string;
    placeholder: string;
  };
}

const DarkModeTheme: IDarkModeTheme = {
  colors: {
    background: '#162d3d',
    button: '#3c8b38',
    text: '#ffffffff',
    hover: '#83bd84',
    border: '#979696',
    placeholder: '#ffffff8d',
  },
};

export default DarkModeTheme;
