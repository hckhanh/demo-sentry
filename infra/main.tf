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
  name        = "demo-saladin"
  description = "This VPC is used to demo Sentry features"
  region      = "sgp1"
}

resource "digitalocean_project" "demo_sentry" {
  name        = "demo-sentry"
  description = "This project is used to demo Sentry features"
  purpose     = "Class project / Educational purposes"
  environment = "Development"
}

resource "digitalocean_app" "demo_sentry" {
  spec {
    name   = "demo-sentry"
    region = "sgp"

    alert {
      rule = "DEPLOYMENT_FAILED"
    }

    database {
      name         = "demo-sentry-db"
      cluster_name = digitalocean_database_cluster.demo_sentry_db.name
      engine       = "PG"
      production   = true
    }

    database {
      name         = "demo-sentry-redis"
      cluster_name = digitalocean_database_cluster.demo_sentry_redis.name
      engine       = "REDIS"
      production   = true
    }

    job {
      name               = "migrate-db"
      kind               = "PRE_DEPLOY"
      instance_size_slug = "basic-xxs"
      instance_count     = 1

      dockerfile_path = "components/jobs/migrate-db/Dockerfile"

      github {
        branch         = "migrate-to-astro"
        repo           = "hckhanh/demo-sentry"
        deploy_on_push = true
      }

      env {
        key   = "DATABASE_URL"
        value = digitalocean_database_connection_pool.demo_sentry_db.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "DIRECT_URL"
        value = digitalocean_database_cluster.demo_sentry_db.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }
    }

    service {
      name               = "demo-sentry-app"
      instance_size_slug = "basic-xxs"
      instance_count     = 1

      http_port       = 4321
      dockerfile_path = "app/Dockerfile"

      health_check {
        http_path             = "/"
        initial_delay_seconds = 15
      }

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

      env {
        key   = "DATABASE_URL"
        value = digitalocean_database_connection_pool.demo_sentry_db.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "DIRECT_URL"
        value = digitalocean_database_cluster.demo_sentry_db.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "DATABASE_REPLICA_URLS"
        value = jsonencode(
          tolist([
            digitalocean_database_replica.demo_sentry_db_1.uri,
            digitalocean_database_replica.demo_sentry_db_2.uri
          ])
        )
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "REDIS_URL"
        value = digitalocean_database_cluster.demo_sentry_redis.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }
    }

    worker {
      name               = "email-worker"
      instance_size_slug = "basic-xxs"
      instance_count     = 1

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

      env {
        key   = "DATABASE_URL"
        value = digitalocean_database_connection_pool.demo_sentry_db.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "DIRECT_URL"
        value = digitalocean_database_cluster.demo_sentry_db.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "DATABASE_REPLICA_URLS"
        value = jsonencode(
          tolist([
            digitalocean_database_replica.demo_sentry_db_1.uri,
            digitalocean_database_replica.demo_sentry_db_2.uri
          ])
        )
        scope = "RUN_TIME"
        type  = "SECRET"
      }

      env {
        key   = "REDIS_URL"
        value = digitalocean_database_cluster.demo_sentry_redis.uri
        scope = "RUN_TIME"
        type  = "SECRET"
      }
    }
  }
}

output "app_url" {
  value = digitalocean_app.demo_sentry.live_url
}
