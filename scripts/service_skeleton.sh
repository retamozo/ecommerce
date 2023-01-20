#!/usr/bin/env sh

make_body()
{
    cat << EOF

    import { notFound, conflict } from "@hapi/boom";
    import sequelize from "@libs/sequelize"

    const { models } = sequelize

    export class $1 {
      constructor() { }

      async create(data) {
        return;
      }

      async find() {
        return;
      }

      async findOne(id: string) {
        return;
      }

      async update(id: string, changes) {
        return;
      }

      async delete(id) {
        return;
      }
    }
EOF
}

check_template_exists()
{
  while [ -e "$template_name" ]
    do
      echo ">>> $template_name: File already exists. Choose a different one:"
      read template_name
    done
}

main()
{
    local template_name
    local default_template_name="service-template.ts"

    local service_name
    local default_service_name="MyService"

    echo "Enter template name: \ output: > 'name'.service.ts"
    read template_name

    echo "Enter service name:"
    read service_name

     if [ -z ${template_name+x} ]
     then
        template_name="$default_template_name"
     elif  [ -z ${service_name+x} ]
      then
        service_name="$default_service_name"
     fi

    check_template_exists

    body=$(make_body "$service_name")
    echo  "$body" | tee src/services/"$template_name".service.ts
}

main
