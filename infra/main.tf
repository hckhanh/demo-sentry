terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "= 2.32.0"
    }
  }

  required_version = ">= 1.1.9"
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_vpc" "network" {
  name   = "demo-saladin"
  region = "sgp1"
}

resource "digitalocean_droplet" "web" {
  region            = "sgp1"
  image             = "ubuntu-22-04-x64"
  size              = "s-1vcpu-1gb-35gb-intel"
  name              = "web"
  ssh_keys          = [digitalocean_ssh_key.default.fingerprint]
  graceful_shutdown = true
  vpc_uuid          = digitalocean_vpc.network.id
}

resource "digitalocean_project" "demo_sentry" {
  name        = "demo-sentry"
  description = "This project is used to demo Sentry features"
  purpose     = "Class project / Educational purposes"
  environment = "Development"
  resources   = [digitalocean_droplet.web.urn]
}
