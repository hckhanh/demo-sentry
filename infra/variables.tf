variable "do_token" {
  description = "DigitalOcean Personal API token"
  type        = string
}

variable "resend_api_key" {
  description = "Resend.com API token"
  type        = string
}

variable "replica_size" {
  description = "Number of replicas"
  type        = number
  default     = 2
}

variable "connection_pool_size" {
  description = "Connection pool size"
  type        = number
  default     = 22
}

variable "domain" {
  description = "Domain name"
  type        = string
}

variable "instance_size" {
  description = "Slug of size of all instances"
  type        = string
}
