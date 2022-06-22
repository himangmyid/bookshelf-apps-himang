const ID_LIST_BELUM = "listBelum";
const ID_LIST_SUDAH = "listSudah";
const ID_BUKU = "idBuku";

function buatListBaca(judulB, penulisB, tahunB, waktuB, selesai) {
    const judulBuku = document.createElement("h3");
    const judul = document.createElement("span");
    judul.classList.add("judul_buku");
    judul.innerText = judulB;
    judulBuku.append(judul);

    const penulisBuku = document.createElement("p");
    penulisBuku.innerText = "Penulis : ";
    const penulis = document.createElement("span");
    penulis.classList.add("penulis_buku");
    penulis.innerText = penulisB;
    penulisBuku.append(penulis);

    const tahunBuku = document.createElement("p");
    tahunBuku.innerText = "Tahun Terbit : ";
    const tahun = document.createElement("span");
    tahun.classList.add("tahun_buku");
    tahun.innerText = tahunB;
    tahunBuku.append(tahun);

    const waktuBuku = document.createElement("p");
    waktuBuku.innerText = "Target Selesai : ";
    const waktu = document.createElement("span");
    waktu.classList.add("waktu_buku");
    waktu.innerText = waktuB;
    waktuBuku.append(waktu);

    const infoBuku = document.createElement("div");
    infoBuku.classList.add("info");
    infoBuku.append(judulBuku, penulisBuku, tahunBuku, waktuBuku);

    const aksiBuku = document.createElement("div");
    aksiBuku.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(infoBuku, aksiBuku);

    if (selesai) {
        aksiBuku.append(
            buatTombolEdit(),
            buatTombolUndo(),
            buatTombolSampah()
        );
    } else {
        aksiBuku.append(buatTombolEdit(), buatTombolCek(), buatTombolSampah());
    }

    return container;
}

function tambahBuku() {
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById("inputBukuSelesai");

    const judul = document.getElementById("inputJudul").value;
    const penulis = document.getElementById("inputPenulis").value;
    const tahun = document.getElementById("inputTahun").value;
    const waktu = document.getElementById("inputTarget").value;
    if (!checkType.checked) {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, false);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, true);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
}

function hapusForm() {
    document.getElementById("inputJudul").value = "";
    document.getElementById("inputPenulis").value = "";
    document.getElementById("inputTahun").value = "";
    document.getElementById("inputTarget").value = "";
    document.getElementById("inputBukuSelesai").checked = false;
}

function buatTombol(buttonTypeClass, eventListener) {
    const tombol = document.createElement("button");
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener("click", function(event) {
        eventListener(event);
    });
    return tombol;
}

function tambahBukuSelesai(elemenBuku) {
    const judulBuku = elemenBuku.querySelector(".judul_buku").innerText;
    const penulisBuku = elemenBuku.querySelector(".penulis_buku").innerText;
    const tahunBuku = elemenBuku.querySelector(".tahun_buku").innerText;
    const waktuBuku = elemenBuku.querySelector(".waktu_buku").innerText;

    const bukuBaru = buatListBaca(judulBuku, penulisBuku, tahunBuku, waktuBuku, true);
    const listSelesai = document.getElementById(ID_LIST_SUDAH);
    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = true;
    bukuBaru[ID_BUKU] = book.id;
    listSelesai.append(bukuBaru);
    elemenBuku.remove();
    updateDataToStorage();
}

function buatTombolCek() {
    return buatTombol("checklist", function(event) {
        const parent = event.target.parentElement;
        tambahBukuSelesai(parent.parentElement);
    });
}

function hapusBukuSelesai(elemenBuku) {
    const posisiBuku = cariIndeksBuku(elemenBuku[ID_BUKU]);
    list.splice(posisiBuku, 1);
    elemenBuku.remove();
    updateDataToStorage();
}

function buatTombolSampah() {
    return buatTombol("trash", function(event) {
        const parent = event.target.parentElement;
        hapusBukuSelesai(parent.parentElement);
    });
}

function buatTombolUndo() {
    return buatTombol("undo", function(event) {
        const parent = event.target.parentElement;
        undoBukuSelesai(parent.parentElement);
    });
}

function buatTombolEdit() {
    return buatTombol("edit", function(event) {
        const parent = event.target.parentElement;
        editInfoBuku(parent.parentElement);
    });
}

function undoBukuSelesai(elemenBuku) {
    const judulBuku = elemenBuku.querySelector(".judul_buku").innerText;
    const penulisBuku = elemenBuku.querySelector(".penulis_buku").innerText;
    const tahunBuku = elemenBuku.querySelector(".tahun_buku").innerText;
    const waktuBuku = elemenBuku.querySelector(".waktu_buku").innerText;

    const bukuBaru = buatListBaca(judulBuku, penulisBuku, tahunBuku, waktuBuku, false);
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);

    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = false;
    bukuBaru[ID_BUKU] = book.id;
    listBelumBaca.append(bukuBaru);
    elemenBuku.remove();

    updateDataToStorage();
}

function editInfoBuku(elemenBuku) {
    document.getElementById("submitBuku").style.display = "none";
    const editButton = document.getElementById("editBuku");
    editButton.style.display = "block";
    document.getElementById("inputJudul").value = elemenBuku.querySelector(".judul_buku").innerText;
    document.getElementById("inputPenulis").value = elemenBuku.querySelector(".penulis_buku").innerText;
    document.getElementById("inputTahun").value = elemenBuku.querySelector(".tahun_buku").innerText;
    document.getElementById("inputTarget").value = elemenBuku.querySelector(".waktu_buku").innerText;

    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        tambahBukuEdit(elemenBuku);
    });
}

function tambahBukuEdit(elemenBuku) {
    elemenBuku.remove();
    hapusBukuSelesai(elemenBuku);
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById("inputBukuSelesai");

    const judul = document.getElementById("inputJudul").value;
    const penulis = document.getElementById("inputPenulis").value;
    const tahun = document.getElementById("inputTahun").value;
    const waktu = document.getElementById("inputTarget").value;
    if (!checkType.checked) {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, false);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, true);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
    hapusForm();
    tombolKembali();
}

function tombolKembali() {
    document.getElementById("submitBuku").style.display = "block";
    document.getElementById("editBuku").style.display = "none";
}