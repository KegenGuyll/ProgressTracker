export const progressStyle = () => {
  const style = {
    card: {
      background: '#323232',
      color: '#fff',
      minWidth: '350px',
      marginBottom: '5px',
      '& .MuiMobileStepper-root': {
        background: '#424242'
      },
      '& .MuiTab-textColorPrimary.Mui-selected': {
        color: '#fff'
      },
      '& .MuiTabs-indicator': {
        backgroundColor: '#fff'
      },
      '& .MuiTab-textColorPrimary': {
        color: 'rgba(255, 255, 255, 0.54)'
      }
    },
    root: {
      '& label.Mui-focused': {
        color: '#c3c3c3'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff'
      },
      '& .MuiInputBase-input': {
        color: '#b0b0b0'
      },
      '& .MuiFormLabel-root': {
        color: '#c3c3c3'
      }
    },
    dialogCard: {
      '& label.Mui-focused': {
        color: '#2b2b2b'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#000000'
      },
      '& .MuiInputBase-input': {
        color: '#000000'
      },
      '& .MuiFormLabel-root': {
        color: '#000000'
      }
    },
    progress: {
      '& .MuiLinearProgress-colorPrimary': {
        backgroundColor: '#fff'
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#212121'
      },
      '& .MuiButton-root': {
        color: '#fff'
      },
      '& .MuiButton-root.Mui-disabled': {
        color: '#5a5a5a'
      }
    },
    whiteIcon: {
      color: '#fff'
    }
  };

  return style;
};
