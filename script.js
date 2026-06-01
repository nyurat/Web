// Preloader functionality
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.querySelector('.preloader-text');
    const progressFill = document.querySelector('.preloader-progress-fill');
    
    // Loading messages
    const loadingMessages = [
        'Memuat Platform...',
        'Menginisialisasi Sistem...',
        'Menyiapkan Template...',
        'Hampir Selesai...'
    ];
    
    let messageIndex = 0;
    let progress = 0;
    
    // Update loading text
    const updateText = () => {
        if (preloaderText) {
            preloaderText.textContent = loadingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }
    };
    
    // Update progress
    const updateProgress = () => {
        if (progressFill && progress < 100) {
            progress += Math.random() * 15 + 5; // Random increment
            if (progress > 100) progress = 100;
            progressFill.style.width = progress + '%';
        }
    };
    
    // Start loading simulation
    const loadingInterval = setInterval(() => {
        updateText();
        updateProgress();
        
        // Hide preloader when complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                hidePreloader();
            }, 500);
        }
    }, 400);
    
    // Hide preloader function
    function hidePreloader() {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    }
});

// Smooth scroll and animation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Navigation functionality
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link and corresponding page
            this.classList.add('active');
            if (pages[index]) {
                pages[index].classList.add('active');
            }
            
            // Close mobile sidebar after selection
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Hero counter animation
    const statItems = document.querySelectorAll('.stat-item');
    const animateValue = (element, start, end, duration) => {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const countAttr = item.getAttribute('data-target') || item.getAttribute('data-count');
                const finalValue = parseInt(countAttr, 10) || 0;
                const duration = 2000; // 2 seconds
                const numberElement = item.querySelector('.stat-number');
                
                if (numberElement) {
                    animateValue(numberElement, 0, finalValue, duration);
                }
                counterObserver.unobserve(item);
            }
        });
    }, observerOptions);
    
    // Observe all stat items
    statItems.forEach(item => {
        counterObserver.observe(item);
    });
    
    // Image zoom functionality
    window.openZoom = function(imgElement) {
        const modal = document.getElementById('zoomModal');
        const zoomedImage = document.getElementById('zoomedImage');
        
        if (modal && zoomedImage) {
            // Set the image source
            zoomedImage.src = imgElement.src;
            zoomedImage.alt = imgElement.alt;
            
            // Show modal
            modal.classList.add('active');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeZoom = function() {
        const modal = document.getElementById('zoomModal');
        
        if (modal) {
            // Hide modal
            modal.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close zoom modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeZoom();
        }
    });
});

// Template functionality
document.addEventListener('DOMContentLoaded', function() {
    const templateBtns = document.querySelectorAll('.template-btn');
    const editor = document.getElementById('editor');
    
    // Template data
    const templates = {
        'surat-undangan-rapat': {
            title: 'Undangan Rapat',
            content: `
                <div class="letter-template" id="surat-undangan-rapat-template">
                    <div class="kop-surat">
                        <p><strong>(NAMA INSTANSI, DAN LOGO INSTANSI)</strong></p>
                        <p>Jl. (nama jalan) Kel. (kelurahan) Kec. (kecamatan) (daerah)</p>
                        <p>E-mail: (email instansi)</p>
                    </div>
                    <br>
                    <div class="surat-content">
                        <p><strong>UNDANGAN RAPAT</strong></p>
                        <p>(Tanggal surat dibuat)</p>
                        <p>Nomor: </p>
                        <p>Lampiran: </p>
                        <p>Hal: Surat Undangan</p>
                        <br>
                        <p>Yth. Bapak/Ibu Kepala Sekolah</p>
                        <p>Di tempat</p>
                        <br>
                        <p>Dalam rangka (deskripsi kegiatan yang akan dilakukan) yang akan dilaksanakan pada:</p>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="width: 150px;"><strong>Hari/Tanggal</strong></td>
                                <td>: </td>
                            </tr>
                            <tr>
                                <td><strong>Pukul</strong></td>
                                <td>: </td>
                            </tr>
                            <tr>
                                <td><strong>Tempat</strong></td>
                                <td>: </td>
                            </tr>
                        </table>
                        <br>
                        <p>Berkaitan dengan hal tersebut, kami mengharapkan (harapan penulis kepada seluruh anggota yang terlibat dalam kegiatan).</p>
                        <p>Demikian undangan ini kami sampaikan. Atas perhatian dan bantuan (Bapak/Ibu), kami ucapkan terima kasih.</p>
                        <br>
                        <p>Panitia Pelaksana (tema kegiatan)</p>
                        <p>(Jabatan penanggung jawab)</p>
                        <p>Nama: </p>
                        <p>NIP: </p>
                        <br>
                        <p>Hormat Kami,</p>
                        <br>
                        <p>Turut Mengundang,</p>
                        <p>……………. </p>
                        <p>(Jabatan panitia)</p>
                        <p>(Jabatan orang yang diundang)</p>
                    </div>
                </div>
            `
        },
        'surat-permohonan': {
            title: 'Permohonan',
            content: `
                <div class="letter-template" id="surat-permohonan-template">
                    <div class="kop-surat">
                        <p><strong>(NAMA INSTANSI, DAN LOGO INSTANSI)</strong></p>
                        <p>Jl. (nama jalan) Kel. (kelurahan) Kec. (kecamatan) (daerah)</p>
                        <p>E-mail: (email instansi)</p>
                    </div>
                    <br>
                    <div class="surat-content">
                        <p><strong>SURAT PERMOHONAN</strong></p>
                        <p>(Tempat, Tanggal)</p>
                        <p>Nomor: </p>
                        <p>Perihal: </p>
                        <br>
                        <p>Yth. (Bapak/Ibu)</p>
                        <p>(Tempat tertujunya surat)</p>
                        <p>(Tempat daerah)</p>
                        <br>
                        <p>Dengan hormat,</p>
                        <p>Sehubungan dengan akan diadakannya (deskripsi kegiatan yang akan diadakan), kami mengajukan permohonan agar (yang bersangkutan/yang diundang) bersedia hadir pada acara yang akan diselenggarakan pada:</p>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="width: 150px;"><strong>Hari/Tanggal</strong></td>
                                <td>: </td>
                            </tr>
                            <tr>
                                <td><strong>Pukul</strong></td>
                                <td>: </td>
                            </tr>
                            <tr>
                                <td><strong>Tempat</strong></td>
                                <td>: </td>
                            </tr>
                        </table>
                        <br>
                        <p>Dengan demikian, surat permohonan ini kami buat. Atas persetujuannya kami ucapkan terima kasih.</p>
                        <br>
                        <p>Mengetahui,</p>
                        <p>(Jabatan tertuju)</p>
                        <p>…………………….</p>
                        <p>(Nama dan gelar)</p>
                    </div>
                </div>
            `
        },
        'surat-izin': {
            title: 'Surat Izin',
            content: `
                <div class="letter-template" id="surat-izin-template">
                    <div class="kop-surat">
                        <p><strong>SURAT IZIN</strong></p>
                    </div>
                    <br>
                    <div class="surat-content">
                        <p>Yth. Bapak/Ibu (nama lengkap dengan gelar)</p>
                        <p>Dosen Mata Kuliah (mata kuliah yang sedang berlangsung)</p>
                        <p>Prodi (nama prodi)</p>
                        <p>Fakultas (nama fakultas)</p>
                        <p>Universitas (nama universitas)</p>
                        <p>Di (nama kepulauan)</p>
                        <br>
                        <p>Dengan hormat,</p>
                        <p>Yang bertanda tangan dibawah ini, saya:</p>
                        <p>Nama: </p>
                        <p>NIM: </p>
                        <p>Kelas: </p>
                        <p>Prodi: </p>
                        <p>Fakultas: </p>
                        <br>
                        <p>Memohon izin kepada Bapak/Ibu tidak dapat mengikuti mata kuliah yang (Bapak/Ibu) ampu karena ……… pada hari ……….</p>
                        <p>Apabila ada tugas atau sejenisnya, saya bersedia untuk mengerjakan dan mengumpulkan tugas sesuai kebijakan dari (Bapak/Ibu).</p>
                        <br>
                        <p>Demikian surat permohonan izin saya buat. Terima kasih atas perhatian dari (Bapak/Ibu).</p>
                        <br>
                        <p>Hormat Saya,</p>
                        <p>……………….</p>
                        <p>(Nama lengkap)</p>
                    </div>
                </div>
            `
        }
    };

    // Template button click handler
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            templateBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Load template content
            const templateType = this.getAttribute('data-template');
            if (templates[templateType]) {
                editor.innerHTML = templates[templateType].content;
                document.getElementById('documentTitle').value = templates[templateType].title;
                updateWordCount();
                updateTextStatus();
            }
        });
    });

    // Load the active template automatically on page load
    const activeTemplateBtn = document.querySelector('.template-btn.active');
    if (activeTemplateBtn) {
        activeTemplateBtn.click();
    }
    
    // Template search functionality
    const templateSearch = document.getElementById('templateSearch');
    if (templateSearch) {
        templateSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const templateCategories = document.querySelectorAll('.template-category');
            
            templateCategories.forEach(category => {
                const categoryName = category.querySelector('h4').textContent.toLowerCase();
                const buttons = category.querySelectorAll('.template-btn');
                let categoryVisible = false;
                
                buttons.forEach(btn => {
                    const btnText = btn.querySelector('span').textContent.toLowerCase();
                    if (btnText.includes(searchTerm) || categoryName.includes(searchTerm)) {
                        btn.style.display = 'flex';
                        categoryVisible = true;
                    } else {
                        btn.style.display = 'none';
                    }
                });
                
                category.style.display = categoryVisible ? 'block' : 'none';
            });
        });
    }

    // Enhanced editor toolbar functionality
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    const fontSelect = document.getElementById('fontSelect');
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    const textCheckBtn = document.getElementById('textCheckBtn');
    const autoFormatBtn = document.getElementById('autoFormatBtn');
    const printBtn = document.getElementById('printBtn');
    const textStatus = document.getElementById('textStatus');
    const textStatusText = document.getElementById('textStatusText');
    
    // Font and size change handlers
    if (fontSelect) {
        fontSelect.addEventListener('change', function() {
            document.execCommand('fontName', false, this.value);
            editor.focus();
        });
    }
    
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', function() {
            document.execCommand('fontSize', false, this.value);
            editor.focus();
        });
    }
    
    // Enhanced toolbar button handler
    if (toolbarBtns) {
        toolbarBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const command = this.getAttribute('data-command');
                
                if (command) {
                    // Handle special commands
                    switch(command) {
                        case 'new':
                            if (confirm('Buat dokumen baru? Semua perubahan yang belum disimpan akan hilang.')) {
                                editor.innerHTML = '';
                                document.getElementById('documentTitle').value = 'Dokumen Baru';
                                updateWordCount();
                                updateTextStatus();
                                const documentStatus = document.getElementById('documentStatus');
                                if (documentStatus) documentStatus.textContent = 'Baru';
                            }
                            break;
                        case 'open':
                            openFile();
                            break;
                        case 'save':
                            saveFile('surat_template.html');
                            break;
                        case 'saveAs':
                            const filename = prompt('Simpan sebagai nama file:', 'surat_template.html');
                            if (filename) saveFile(filename);
                            break;
                        case 'insertTable':
                            insertTable();
                            break;
                        case 'insertLink':
                            insertLink();
                            break;
                        case 'insertImage':
                            insertImage();
                            break;
                        case 'insertDate':
                            insertDate();
                            break;
                        case 'uppercase':
                            transformText('uppercase');
                            break;
                        case 'lowercase':
                            transformText('lowercase');
                            break;
                        case 'capitalize':
                            transformText('capitalize');
                            break;
                        case 'findReplace':
                            findReplace();
                            break;
                        default:
                            // Standard execCommand operations
                            try {
                                document.execCommand(command, false, null);
                            } catch (error) {
                                console.warn('Command not supported:', command);
                            }
                    }
                    editor.focus();
                    updateWordCount();
                }
            });
        });
    }
    
    // Preview functionality
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            const content = editor.innerHTML;
            const previewWindow = window.open('', '_blank', 'width=800,height=600');
            previewWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Preview Surat</title>
                    <style>
                        body { font-family: 'Times New Roman', serif; margin: 20px; }
                        .kop-surat { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #333; }
                        .surat-content p { margin-bottom: 5px; }
                        table { width: 100%; border-collapse: collapse; }
                        table td { padding: 5px 0; }
                    </style>
                </head>
                <body>
                    ${content}
                </body>
                </html>
            `);
            previewWindow.document.close();
        });
    }
    
    // Reset functionality
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin mereset konten editor?')) {
                const activeTemplate = document.querySelector('.template-btn.active');
                if (activeTemplate) {
                    const templateType = activeTemplate.getAttribute('data-template');
                    if (templates[templateType]) {
                        editor.innerHTML = templates[templateType].content;
                    }
                }
            }
        });
    }
    
    // Download functionality
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const content = editor.innerHTML;
            const wordDocument = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>Surat Word</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
    body { font-family: 'Times New Roman', serif; }
    .letter-template { width: 100%; }
    .kop-surat { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #333; }
    .surat-content p { margin-bottom: 5px; }
    table { width: 100%; border-collapse: collapse; }
</style>
</head>
<body>
${content}
</body>
</html>`;
            const blob = new Blob([wordDocument], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'surat_template.doc';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
    
    // Export PDF functionality
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF || typeof html2canvas === 'undefined') {
                alert('Gagal mengekspor PDF. Pastikan koneksi internet tersambung.');
                return;
            }

            const cloneWrapper = document.createElement('div');
            cloneWrapper.style.position = 'absolute';
            cloneWrapper.style.left = '-9999px';
            cloneWrapper.style.top = '0';
            cloneWrapper.style.width = '820px';
            cloneWrapper.style.padding = '0';
            cloneWrapper.style.background = '#ffffff';
            cloneWrapper.style.overflow = 'visible';

            const editorClone = editor.cloneNode(true);
            editorClone.style.width = '800px';
            editorClone.style.maxHeight = 'none';
            editorClone.style.height = 'auto';
            editorClone.style.overflow = 'visible';
            editorClone.style.padding = '20px';
            editorClone.style.margin = '0';
            editorClone.style.boxSizing = 'border-box';
            editorClone.style.background = '#ffffff';

            cloneWrapper.appendChild(editorClone);
            document.body.appendChild(cloneWrapper);

            html2canvas(editorClone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                windowWidth: 820,
                windowHeight: editorClone.scrollHeight + 200
            }).then(canvas => {
                document.body.removeChild(cloneWrapper);

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4');
                const margin = 20;
                const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;

                let position = 0;
                pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
                let heightLeft = pdfHeight - pageHeight;

                while (heightLeft > 0) {
                    position -= pageHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', margin, position + margin, pdfWidth, pdfHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('surat_template.pdf');
            }).catch(error => {
                document.body.removeChild(cloneWrapper);
                console.error('Export PDF error:', error);
                alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
            });
        });
    }
    
    // Text check functionality
    if (textCheckBtn) {
        textCheckBtn.addEventListener('click', function() {
            const text = editor.innerText || editor.textContent;
            const errors = checkText(text);
            
            // Clear previous highlights
            clearTextHighlights();
            
            if (errors.length === 0) {
                textStatus.className = 'text-status';
                textStatusText.textContent = 'Tidak ada kesalahan penulisan';
                showNotification('✅ Dokumen sudah sesuai teks!', 'success');
            } else {
                textStatus.className = 'text-status warning';
                textStatusText.textContent = 'Ditemukan ' + errors.length + ' kesalahan penulisan';
                highlightTextErrors(errors);
                showNotification(`⚠️ Ditemukan ${errors.length} kesalahan penulisan`, 'warning');
            }
        });
    }
    
    // Auto Format functionality
    if (autoFormatBtn) {
        autoFormatBtn.addEventListener('click', function() {
            const text = editor.innerText || editor.textContent;
            let formattedText = text
                .replace(/\s+/g, ' ')  // Remove extra spaces
                .replace(/\.\s*/g, '.\n\n')  // Add line breaks after periods
                .replace(/:\s*/g, ': ')  // Fix spacing after colons
                .replace(/,\s*/g, ', ')  // Fix spacing after commas
                .trim();
            
            // Basic capitalization for sentence starts
            formattedText = formattedText.replace(/([.!?]\s*)([a-z])/g, function(match, punctuation, letter) {
                return punctuation + letter.toUpperCase();
            });
            
            // Apply formatting
            if (confirm('Ini akan menghapus format HTML. Lanjutkan?')) {
                editor.innerText = formattedText;
            }
            
            if (textCheckBtn) {
                const text = editor.innerText || editor.textContent;
                const errors = checkText(text);
                
                if (errors.length === 0) {
                    textStatus.className = 'text-status';
                    textStatusText.textContent = 'Tidak ada kesalahan penulisan';
                } else {
                    textStatus.className = 'text-status warning';
                    textStatusText.textContent = 'Ditemukan ' + errors.length + ' kesalahan penulisan';
                }
            }
        });
    }
    
    // Print functionality — open a clean print window with A4 sizing
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            try {
                const printContent = editor.innerHTML;
                const printWindow = window.open('', '_blank', 'width=900,height=700');

                const styles = `
                    <style>
                        @page { size: A4; margin: 20mm; }
                        html, body { height: 100%; }
                        body { font-family: 'Times New Roman', serif; margin: 0; padding: 0; background: #ffffff; }
                        .letter-template { width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; box-sizing: border-box; }
                        img { max-width: 100%; height: auto; }
                        table { width: 100%; border-collapse: collapse; }
                        p { margin: 0 0 8px 0; }
                    </style>
                `;

                printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Cetak Surat</title>${styles}</head><body><div class="letter-template">${printContent}</div></body></html>`);
                printWindow.document.close();

                // Wait until content (including images) is loaded before printing
                const onReady = () => {
                    clearTimeout(timeout);
                    printWindow.focus();
                    printWindow.print();
                    // Do not force-close — some browsers block it. User can close manually.
                };

                const timeout = setTimeout(() => {
                    // Fallback: just print after timeout
                    try { printWindow.focus(); printWindow.print(); } catch (e) { console.error(e); }
                }, 1500);

                // If images exist, wait for them to load
                const imgs = printWindow.document.images;
                if (imgs && imgs.length > 0) {
                    let loaded = 0;
                    for (let i = 0; i < imgs.length; i++) {
                        imgs[i].addEventListener('load', () => {
                            loaded++;
                            if (loaded === imgs.length) onReady();
                        });
                        imgs[i].addEventListener('error', () => {
                            loaded++;
                            if (loaded === imgs.length) onReady();
                        });
                    }
                } else {
                    // No images, ready immediately
                    // Use small delay to allow fonts/styles to apply
                    setTimeout(onReady, 300);
                }
            } catch (err) {
                console.error('Print error:', err);
                alert('Terjadi kesalahan saat menyiapkan cetak. Silakan coba lagi.');
            }
        });
    }
    
    // Auto-save functionality
    let autoSaveTimer;
    if (editor) {
        editor.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(function() {
                localStorage.setItem('nyurat_editor_content', editor.innerHTML);
                console.log('Content auto-saved');
            }, 2000);
            
            // Update real-time information
            updateWordCount();
            updateTextStatus();
            
            // Update document status
            const documentStatus = document.getElementById('documentStatus');
            if (documentStatus) {
                documentStatus.textContent = 'Telah diubah';
            }
        });
        
        // Update cursor position on click and keyup
        editor.addEventListener('click', function(event) {
            updateCursorPosition();
            handleEditorImageClick(event);
        });
        editor.addEventListener('keyup', updateCursorPosition);
        editor.addEventListener('scroll', function() {
            if (activeImage) updateImageResizerPosition();
        });
        editor.addEventListener('keydown', function() {
            setTimeout(updateCursorPosition, 0);
        });
    }
    
    document.addEventListener('mousedown', function(event) {
        const target = event.target;
        if (activeImage && imageResizer && !imageResizer.contains(target) && target.tagName !== 'IMG') {
            hideImageResizer();
        }
    });
    
    function handleEditorImageClick(event) {
        const target = event.target;
        const editor = document.getElementById('editor');
        if (target && target.tagName === 'IMG' && editor && editor.contains(target)) {
            showImageResizer(target);
        }
    }
    
    // Load saved content on page load
    const savedContent = localStorage.getItem('nyurat_editor_content');
    if (savedContent && editor && editor.innerHTML === '') {
        editor.innerHTML = savedContent;
    }
    
    // Initialize image resize/drag support
    enableImageInteractions();

    // Initialize word count and text status
    updateWordCount();
    updateTextStatus();
    updateCursorPosition();
    
    // Text validation (basic)
    if (editor) {
        editor.addEventListener('input', function() {
            const text = editor.innerText || editor.textContent;
            const commonErrors = [
                { pattern: /\bdgn\b/g, replacement: 'dengan', message: 'Gunakan "dengan" bukan "dgn"' },
                { pattern: /\bpd\b/g, replacement: 'pada', message: 'Gunakan "pada" bukan "pd"' },
                { pattern: /\byg\b/g, replacement: 'yang', message: 'Gunakan "yang" bukan "yg"' },
                { pattern: /\buntk\b/g, replacement: 'untuk', message: 'Gunakan "untuk" bukan "untk"' },
                { pattern: /\bdll\b/g, replacement: 'dan lain-lain', message: 'Gunakan "dan lain-lain" bukan "dll"' },
                { pattern: /\btdk\b/g, replacement: 'tidak', message: 'Gunakan "tidak" bukan "tdk"' }
            ];
            
            // You can add visual indicators for text errors here
            // This is a basic implementation
        });
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Print functionality
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
});

// Navigation function
function navigateToPage(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Remove active class from all links and pages
    navLinks.forEach(l => l.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    // Add active class to target page and corresponding nav link
    const targetPage = document.getElementById(pageName);
    const targetLink = document.querySelector(`[data-page="${pageName}"]`);
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Utility functions
function formatText(command, value = null) {
    document.execCommand(command, false, value);
}

function updateWordCount() {
    const editor = document.getElementById('editor');
    const wordCountElement = document.getElementById('wordCount');
    if (editor && wordCountElement) {
        const text = editor.innerText || editor.textContent;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCountElement.textContent = words.length;
    }
}

function updateCursorPosition() {
    const editor = document.getElementById('editor');
    const cursorPositionElement = document.getElementById('cursorPosition');
    if (editor && cursorPositionElement) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(editor);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            const text = preCaretRange.toString();
            const lines = text.split('\n');
            const currentLine = lines.length;
            const currentColumn = lines[lines.length - 1].length + 1;
            cursorPositionElement.textContent = `Baris ${currentLine}, Kolom ${currentColumn}`;
        }
    }
}

function updateTextStatus() {
    const editor = document.getElementById('editor');
    const textStatus = document.getElementById('textStatus');
    const textStatusText = document.getElementById('textStatusText');
    
    if (editor && textStatus && textStatusText) {
        const text = editor.innerText || editor.textContent;
        const errors = checkText(text);
        
        if (errors.length === 0) {
            textStatus.className = 'text-status';
            textStatusText.textContent = 'Teks bersih';
        } else {
            textStatus.className = 'text-status warning';
            textStatusText.textContent = `${errors.length} masalah teks`;
        }
    }
}

function insertText(text) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.selectNodeContents(range.startContainer);
    selection.removeAllRanges();
    selection.addRange(range);
}

function insertTable() {
    const tableHtml = `
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Kolom 1</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Kolom 2</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Kolom 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Data 1</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Data 2</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Data 3</td>
            </tr>
        </table>
    `;
    document.execCommand('insertHTML', false, tableHtml);
}

function insertLink() {
    const url = prompt('Masukkan URL link:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

let activeImage = null;
let imageResizer = null;
let isResizingImage = false;
let imageResizeStartX = 0;
let imageResizeStartWidth = 0;

function insertImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', function() {
        const file = fileInput.files && fileInput.files[0];
        if (!file) {
            document.body.removeChild(fileInput);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imgHtml = `<img src="${event.target.result}" alt="User Image" style="max-width: 100%; height: auto;">`;
            document.execCommand('insertHTML', false, imgHtml);
            enableImageInteractions();
            document.body.removeChild(fileInput);
            if (activeImage === null) {
                const editor = document.getElementById('editor');
                const images = editor.querySelectorAll('img');
                const lastImage = images[images.length - 1];
                if (lastImage) showImageResizer(lastImage);
            }
        };

        reader.readAsDataURL(file);
    });

    document.body.appendChild(fileInput);
    fileInput.click();
}

function createImageResizer() {
    if (imageResizer) return;

    imageResizer = document.createElement('div');
    imageResizer.className = 'image-resizer';
    imageResizer.style.display = 'none';
    imageResizer.style.pointerEvents = 'none';

    const handle = document.createElement('div');
    handle.className = 'image-resize-handle';
    handle.addEventListener('mousedown', startImageResize);
    imageResizer.appendChild(handle);

    document.body.appendChild(imageResizer);

    document.addEventListener('mousemove', resizeImageMouseMove);
    document.addEventListener('mouseup', endImageResize);
}

function startImageResize(event) {
    if (!activeImage) return;

    isResizingImage = true;
    imageResizeStartX = event.clientX;
    imageResizeStartWidth = activeImage.getBoundingClientRect().width;
    event.preventDefault();
    event.stopPropagation();
}

function resizeImageMouseMove(event) {
    if (!isResizingImage || !activeImage) return;

    const delta = event.clientX - imageResizeStartX;
    const newWidth = Math.max(50, imageResizeStartWidth + delta);
    activeImage.style.width = `${newWidth}px`;
    activeImage.style.height = 'auto';
    updateImageResizerPosition();
}

function endImageResize() {
    if (!isResizingImage) return;
    isResizingImage = false;
}

function showImageResizer(img) {
    if (!img) return;
    createImageResizer();

    activeImage = img;
    imageResizer.style.display = 'block';
    imageResizer.style.pointerEvents = 'auto';
    updateImageResizerPosition();
}

function hideImageResizer() {
    if (!imageResizer) return;
    imageResizer.style.display = 'none';
    activeImage = null;
}

function updateImageResizerPosition() {
    if (!activeImage || !imageResizer) return;

    const rect = activeImage.getBoundingClientRect();
    imageResizer.style.left = `${rect.left + window.scrollX - 4}px`;
    imageResizer.style.top = `${rect.top + window.scrollY - 4}px`;
    imageResizer.style.width = `${rect.width + 8}px`;
    imageResizer.style.height = `${rect.height + 8}px`;
}

function enableImageInteractions() {
    const editor = document.getElementById('editor');
    if (!editor) return;

    try {
        document.execCommand('enableObjectResizing', false, true);
        document.execCommand('enableInlineTableEditing', false, true);
    } catch (e) {
        console.warn('enableObjectResizing tidak didukung:', e);
    }

    editor.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'true');
        img.style.cursor = 'move';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

function insertDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('id-ID', options);
    document.execCommand('insertText', false, formattedDate);
}

function transformText(transform) {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
        let transformedText;
        switch(transform) {
            case 'uppercase':
                transformedText = selectedText.toUpperCase();
                break;
            case 'lowercase':
                transformedText = selectedText.toLowerCase();
                break;
            case 'capitalize':
                transformedText = selectedText.replace(/\b\w/g, char => char.toUpperCase());
                break;
        }
        
        if (transformedText) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(transformedText));
        }
    }
}

function findReplace() {
    const findText = prompt('Cari teks:');
    if (findText) {
        const replaceText = prompt('Ganti dengan:');
        if (replaceText !== null) {
            const editor = document.getElementById('editor');
            const content = editor.innerHTML;
            const regex = new RegExp(findText, 'gi');
            const newContent = content.replace(regex, replaceText);
            editor.innerHTML = newContent;
            updateWordCount();
            showNotification(`Teks "${findText}" telah diganti dengan "${replaceText}"`, 'success');
        }
    }
}

function saveFile(filename) {
    const editor = document.getElementById('editor');
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${filename}</title></head><body>${editor.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification(`File disimpan sebagai ${filename}`, 'success');
}

function openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.htm,.txt';
    input.addEventListener('change', function() {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function() {
            const content = reader.result;
            const editor = document.getElementById('editor');
            if (editor) {
                editor.innerHTML = content;
                updateWordCount();
                updateTextStatus();
                showNotification(`File ${file.name} berhasil dibuka`, 'success');
            }
        };
        reader.readAsText(file);
    });
    input.click();
}

// Enhanced text validation
function checkText(text) {
    const errors = [];
    
    // Common abbreviations and slang
    const abbreviations = {
        'dgn': 'dengan',
        'pd': 'pada', 
        'yg': 'yang',
        'untk': 'untuk',
        'dll': 'dan lain-lain',
        'tdk': 'tidak',
        'sbg': 'sebagai',
        'sdh': 'sudah',
        'akn': 'akan',
        'hrs': 'harus',
        'bhw': 'bahwa',
        'tsb': 'tersebut',
        'dlm': 'dalam',
        'krn': 'karena',
        'utk': 'untuk',
        'spt': 'seperti',
        'dg': 'dengan',
        'tp': 'tapi',
        'jg': 'juga',
        'lg': 'lagi',
        'gk': 'tidak',
        'ga': 'tidak',
        'sy': 'saya',
        'q': 'saya',
        'km': 'kamu',
        'ko': 'kamu'
    };
    
    // Check abbreviations
    for (const [abbr, full] of Object.entries(abbreviations)) {
        const regex = new RegExp('\\b' + abbr + '\\b', 'gi');
        if (regex.test(text)) {
            errors.push({
                type: 'abbreviation',
                found: abbr,
                suggestion: full,
                message: 'Gunakan "' + full + '" bukan "' + abbr + '"'
            });
        }
    }
    
    // Check capitalization at sentence start
    const sentences = text.split(/[.!?]+/);
    sentences.forEach((sentence, index) => {
        const trimmed = sentence.trim();
        if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
            errors.push({
                type: 'capitalization',
                found: trimmed.substring(0, 10),
                suggestion: trimmed[0].toUpperCase() + trimmed.substring(1),
                message: 'Huruf pertama kalimat harus kapital'
            });
        }
    });
    
    // Check spacing after punctuation
    if (/[.,!?][^\s]/.test(text)) {
        errors.push({
            type: 'spacing',
            found: 'punctuation tanpa spasi',
            suggestion: 'tambahkan spasi setelah tanda baca',
            message: 'Tambahkan spasi setelah tanda baca (.,!?)'
        });
    }
    
    // Check multiple spaces
    if (/\s{2,}/.test(text)) {
        errors.push({
            type: 'spacing',
            found: 'multiple spaces',
            suggestion: 'single space',
            message: 'Gunakan satu spasi antar kata'
        });
    }
    
    return errors;
}

// Text Highlighting and Notification Functions
function clearTextHighlights() {
    const editor = document.getElementById('editor');
    if (editor) {
        const highlighted = editor.querySelectorAll('.text-error');
        highlighted.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
            parent.normalize();
        });
    }
}

function highlightTextErrors(errors) {
    const editor = document.getElementById('editor');
    if (!editor) return;
    
    let html = editor.innerHTML;
    
    // Highlight abbreviation errors
    errors.forEach(error => {
        if (error.type === 'abbreviation') {
            const regex = new RegExp('\\b' + error.found + '\\b', 'gi');
            html = html.replace(regex, `<span class="text-error" title="${error.message}">${error.found}</span>`);
        }
    });
    
    editor.innerHTML = html;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize tooltips for text errors
function showTextTooltip(element, errors) {
    // Implementation for showing text error tooltips
    // This can be enhanced with a proper tooltip library
}
