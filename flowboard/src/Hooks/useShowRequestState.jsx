import Swal from 'sweetalert2'

export  const useShowPendingState = async (msg = 'Bringing the data, please wait.') => {
            Swal.fire({
          title: 'Pending...',
          text: msg,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
     
    }
     
export  const useShowSuccessState = async (msg = 'Data fetched successfully.') => {
         Swal.fire({
        icon: 'success',
        title: 'Done!',
        text: msg,
        timer: 2000,
        showConfirmButton: false,
      });
    }

export   const useShowFailureState = async (msg = 'Something went wrong.') => {
        Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text:  msg 
      });
    }