terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.34.1"
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

resource "digitalocean_app" "demo_sentry" {
  spec {
    name   = "demo-sentry"
    region = "sgp"

    alert {
      rule = "DEPLOYMENT_FAILED"
    }

    worker {
      name               = "email-worker"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      dockerfile_path = "components/workers/email-worker/Dockerfile"

      github {
        branch         = "migrate-to-astro"
        repo           = "hckhanh/demo-sentry"
        deploy_on_push = true
      }

      env {
        key   = "RESEND_API_KEY"
        value = var.resend_api_key
        scope = "RUN_TIME"
        type  = "SECRET"
      }
    }
  }
}

resource "digitalocean_project" "demo_sentry" {
  name        = "demo-sentry"
  description = "This project is used to demo Sentry features"
  purpose     = "Class project / Educational purposes"
  environment = "Development"
  resources   = [digitalocean_app.demo_sentry.urn]
}
