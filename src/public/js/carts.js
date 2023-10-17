function putIntoCart(_id) {
  const cartInfoElement = document.querySelector('.cartId');
  const cartId = cartInfoElement?.id;
  if (cartId === undefined) {
    window.location.href = 'https://proyectofinalbackend-maurogarro.onrender.com/auth/login';
  }

  fetch(`/api/carts/${cartId}/products/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`Producto con el id: ${_id} se agregó al cart con id: ${cartId}`);
    })
    .catch((err) => console.log(err));
}
