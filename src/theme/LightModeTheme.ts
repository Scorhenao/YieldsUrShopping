interface ILightModeTheme {
  colors: {
    background: string;
    button: string;
    text: string;
    hover: string;
    border: string;
    placeholder: string;
  };
}

const LightModeTheme: ILightModeTheme = {
  colors: {
    background: '#b3b3b3',
    button: '#43cb3b',
    text: '#000000',
    hover: '#83bd84',
    border: '#4c4b4b',
    placeholder: '#211f1f',
  },
};

export default LightModeTheme;
