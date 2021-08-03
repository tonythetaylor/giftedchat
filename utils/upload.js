const uploadFile = async (setPercentage) => {
    try {
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
  
          if (percent <= 100) {
            setPercentage(percent);
          }
        }
      };

    } catch (error) {
      console.log(error.message);
    }
  };
  
  export default uploadFile;
  