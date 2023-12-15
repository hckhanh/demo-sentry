resource "digitalocean_ssh_key" "default" {
  name       = "Default SSH key for system"
  public_key = file("./ssh_key/id_rsa.pub")
}
