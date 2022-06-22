document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("submitBuku");
    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        tambahBuku();
        hapusForm();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromList();
});

const checkType = document.getElementById("inputBukuSelesai");
checkType.addEventListener("click", () => {
    if (checkType.checked) {
        document.getElementById("tipeBuku").innerHTML = "<strong>Selesai Dibaca</strong>";
        document.getElementById("type").innerHTML = "<strong>Selesai Dibaca</strong>";
    } else {
        document.getElementById("tipeBuku").innerHTML = "<strong>Belum Dibaca</strong>";
        document.getElementById("editTipeBuku").innerHTML = "<strong>Belum Dibaca</strong>";
    }
});