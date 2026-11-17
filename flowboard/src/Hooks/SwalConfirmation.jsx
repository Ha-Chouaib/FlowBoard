import Swal from "sweetalert2";

export async function swalConfirm(msg = 'Sure to complete this operation?') {
    const result = await Swal.fire({
        title: msg,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
  });
  return result.isConfirmed;
}