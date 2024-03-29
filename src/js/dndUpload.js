const fileInputs = document.querySelectorAll('[data-dnd_files]');
const dnd = document.querySelectorAll('[data-dnd]');

if (dnd) {
    for (const dndContainer of dnd) {
        const dropArea = dndContainer.querySelector('[data-dnd_droparea]');
        let filesContainer = dndContainer.querySelector('[data-dnd_file_list]');

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
            dropArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach((eventName) => {
            dropArea.addEventListener(eventName, highlight, false);
            console.log('drag enter');
        });

        ['dragleave', 'drop'].forEach((eventName) => {
            dropArea.addEventListener(eventName, unhighlight, false);
            console.log('drag leave');
        });

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight(e) {
            dropArea.classList.add('highlight');
        }

        function unhighlight(e) {
            dropArea.classList.remove('active');
        }

        function handleDrop(e) {
            var dt = e.dataTransfer;
            var files = dt.files;

            handleFiles(files);
        }

        function handleFiles(files) {
            files = [...files];
            files.forEach(uploadFile);
            files.forEach(previewFile);
        }

        function previewFile(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                let template = document.querySelector('[data-dnd_filetemplate]');
                let clone = template.content.cloneNode(true);
                let fileName = clone.querySelector('[data-dnd_filename]');
                fileName.textContent = file.name;
                const decimals = 2;
                const dm = decimals < 0 ? 0 : decimals;
                let fileSize = clone.querySelector('[data-dnd_filesize]');
                fileSize.textContent = (file.size / 1024).toFixed(dm) + ' KB';
                filesContainer.appendChild(clone);
            };
        }

        function uploadFile(file, i) {
            var url = 'http://localhost:3000';
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            formData.append('file', file);
            xhr.send(formData);
        }
    }
}

if (fileInputs) {
    for (var input of fileInputs) {
        input.addEventListener(
            'change',
            (evt) => {
                handleFiles(evt.target.files);
            },
            false
        );
    }
}
