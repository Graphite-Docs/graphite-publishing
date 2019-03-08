export function growl(params) {
    document.getElementById('growl').style.display = 'block';
    document.getElementById('growl-message').innerText = params.message;
    if(params.error) {
        document.getElementById('growl').style.background = '#e60000';
    }
    setTimeout(() => {
        document.getElementById('growl').style.display = 'none';
    }, params.timeout)
}